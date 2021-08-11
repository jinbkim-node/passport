module.exports = {
  html: function(body, authStatusUI='<a href="/auth/login">login</login>'){
    return `
      <!doctype html>
      <html>
      <body>
        ${authStatusUI}
        ${body}
      </body>
      </html>
    `;
  }
}