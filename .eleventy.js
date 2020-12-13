const isProd = process.env.NODE_ENV === 'production'

if (!isProd) {
  require('dotenv').config()
}

const markdownIt = require('markdown-it')
const htmlmin = require('html-minifier')
const eleventyNavigationPlugin = require('@11ty/eleventy-navigation')
const pluginRss = require('@11ty/eleventy-plugin-rss')

module.exports = (eleventyConfig) => {
  eleventyConfig.setDataDeepMerge(true)

  eleventyConfig.setLibrary(
    'md',
    markdownIt({
      html: true,
      breaks: true,
      linkify: true,
      typographer: true,
    })
  )

  eleventyConfig.addPlugin(eleventyNavigationPlugin)
  eleventyConfig.addPlugin(pluginRss)

  eleventyConfig.addTransform('htmlmin', function (content, outputPath) {
    if (isProd && (outputPath.endsWith('.html') || outputPath.endsWith('.xml'))) {
      return htmlmin.minify(content, {
        useShortDoctype: true,
        removeComments: true,
        collapseWhitespace: true,
        collapseBooleanAttributes: true,
        minifyCSS: true,
        minifyJS: true,
      })
    }

    return content
  })

  eleventyConfig.addFilter('machineDate', function (date) {
    if (typeof date.toISOString !== 'function') {
      date = new Date(date)
    }

    return date.toISOString()
  })

  eleventyConfig.addFilter('shortDate', function (date) {
    if (typeof date.toISOString !== 'function') {
      date = new Date(date)
    }

    return new Intl.DateTimeFormat('en-AU', {
      dateStyle: 'short',
    }).format(date)
  })

  eleventyConfig.addFilter('humanDate', function (date) {
    if (typeof date.toISOString !== 'function') {
      date = new Date(date)
    }

    return new Intl.DateTimeFormat('en-AU', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }).format(date)
  })

  eleventyConfig.addFilter('humanDateTime', function (date) {
    if (typeof date.toISOString !== 'function') {
      date = new Date(date)
    }

    const formattedDate = new Intl.DateTimeFormat('en-AU', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }).format(date)

    const formattedTime = new Intl.DateTimeFormat('en-AU', {
      hour: 'numeric',
      minute: 'numeric',
    }).format(date)

    return `${formattedDate} at ${formattedTime}`
  })

  eleventyConfig.addWatchTarget('src/*.css')

  eleventyConfig.addPassthroughCopy('src/img')
  eleventyConfig.addPassthroughCopy('src/manifest.json')
  eleventyConfig.addPassthroughCopy('src/_redirects')

  return {
    dir: { input: 'src', output: 'dist' },
    templateFormats: ['html', 'njk', 'md'],
    dataTemplateEngine: 'njk',
    htmlTemplateEngine: 'njk',
    markdownTemplateEngine: 'njk',
  }
}
