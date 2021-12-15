function withOpacity(variableName) {
  return ({opacityValue}) => {
    if (opacityValue !== undefined) {
      return `rgba(var(${variableName}), ${opacityValue})`
    }
    return `rgb(var(${variableName}))`
  }
}

module.exports = {
  content: ['./app/**/*.{html,tsx}'],
  theme: {
    extend: {
      textColor: {
        skin: {
          base: withOpacity('--theme-text-base'),
          highlight: withOpacity('--theme-text-highlight'),
          muted: withOpacity('--theme-text-muted'),
          button: withOpacity('--theme-button-text'),
          'button-muted': withOpacity('--theme-button-text-muted'),
          'button-inverted': withOpacity('--theme-button-inverted-text'),
          'button-inverted-muted': withOpacity('--theme-button-inverted-muted'),
        },
      },
      backgroundColor: {
        skin: {
          base: withOpacity('--theme-background-base'),
          highlight: withOpacity('--theme-background-highlight'),
          'button-bg': withOpacity('--theme-button-background'),
          'button-inverted-bg': withOpacity(
            '--theme-button-inverted-background',
          ),
        },
      },
      gridTemplateRows: {
        'app-sm': 'auto 1fr auto',
        'app-md': 'auto 1fr auto',
      },
      gradientColorStops: {
        skin: {
          hue: withOpacity('--theme-background-highlight'),
        },
      },
    },
  },
  plugins: [],
}
