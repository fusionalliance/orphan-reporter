# orphan-reporter

Description goes here

# Usage

**Gulp**
Using your build tool to list assets: 

```JavaScript
// Find Orphans 
// Multiple functions - one for .scss one for .html

// Find Asset Paths in CSS:
gulp.task('logImageFilesInCSS', () => {
  // Sanity check on the SVG File list
  orphanReporter.checkListFileExists();

  return gulp.src(['public/assets/css/*.css']) // TODO: Change this to your path
    .pipe(tap((file) => {
      const matches = file.contents.toString('utf8').match(/url\((.*?)\)/ig);
      let filePaths = [];
      if (matches) {
        filePaths = matches.map(match => match.replace('url(', '').replace(')', ''));
      }
      if (filePaths) {
        filePaths.forEach(filePath => orphanReporter.writeToList(filePath, 'images'));
      }
    }));
});

// Find Asset paths in HTML
gulp.task('logImageFilesInHtml', () => {
  // Sanity check on the SVG File list
  orphanReporter.checkListFileExists();

  return gulp.src(['public/**/*.html']) // TODO: Change this to your path
    .pipe(tap((file) => {
      const matches = file.contents.toString('utf8').match(/src=("|')(.*)(.(svg|png|jpg|jpeg|gif))('|")/img);
      let filePaths = [];

      if (matches) {
        filePaths = matches.map(match => match.replace('src=', '')
          .replace('"', '')
          .replace("'", '')
          .replace('"', '')
          .replace("'"));
      }

      if (filePaths) {
        filePaths.forEach(filePath => orphanReporter.writeToList(filePath, 'images'));
      }
    }));
});

// Find PDFs in HTML Files
gulp.task('logPdfFilesInHtml', () => {
  // Sanity check on the SVG File list
  orphanReporter.checkListFileExists();

  return gulp.src(['public/**/*.html']) // TODO: Change this to your path
    .pipe(tap((file) => {
      const matches = file.contents.toString('utf8').match(/href=("|')(.*)(.pdf)('|")/img);
      let filePaths = [];
      if (matches) {
        filePaths = matches.map(match => match.replace('href=', '')
          .replace('"', '')
          .replace("'", '')
          .replace('"', '')
          .replace("'"));
      }

      if (filePaths) {
        filePaths.forEach(filePath => orphanReporter.writeToList(filePath, 'pdfs'));
      }
    }));
});
```
