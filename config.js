module.exports = {
  /** Site MetaData (Required all)*/
  title: `DEV.HAPPY JYOON`,                         // (* Required)
  description: `Dev.jYoon Blog`,          // (* Required)
  author: `jYoon`,                         // (* Required)
  siteUrl: 'https://happyjy.github.io',                      // (* Required)
    // ex.'https://junhobaik.github.io'
    // ex.'https://junhobaik.github.io/' << X, Do not enter "/" at the end.

  /** Header */
  profileImageFileName: 'profile.jpg', // include filename extension ex.'profile.jpg'
    // The Profile image file is located at path "./images/"
    // If the file does not exist, it is replaced by a random image.

  /** Home > Bio information*/
  comment: 'Jr. Web Front-end Developer. /javascript, react, node.js ... ',
  name: 'Jaeyoon Yoon',
  company: '',
  location: 'Korea',
  email: 'okwoyjy@gmail.com',
  website: 'https://happyjy.github.io',           // ex.'https://junhobaik.github.io'
  linkedin: '',                                                          // ex.'https://www.linkedin.com/in/junho-baik-16073a19ab'
  facebook: '',                                                          // ex.'https://www.facebook.com/zuck' or 'https://www.facebook.com/profile.php?id=000000000000000'
  instagram: 'https://www.instagram.com/happyjy',                                                         // ex.'https://www.instagram.com/junhobaik'
  github: 'https://github.com/happyjy',                                                            // ex.'https://github.com/junhobaik'

  /** Post */
  enablePostOfContents: true,     // TableOfContents activation (Type of Value: Boolean. Not String)
  disqusShortname: 'jYoon',            // comments (Disqus sort-name)
  enableSocialShare: true,        // Social share icon activation (Type of Value: Boolean. Not String)

  /** Optional */
  googleAnalytics: 'UA-156128440-1',                  // Google Analytics TrackingID. ex.'UA-123456789-0'
  googleAdsenseSlot: '5214956675',                // Google Adsense Slot. ex.'5214956675'
  googleAdsenseClient: 'ca-pub-4694803443368514', // Google Adsense Client. ex.'ca-pub-5001380215831339'
    // Please correct the adsense client number(ex.5001380215831339) in the './static/ads.txt' file.
};
