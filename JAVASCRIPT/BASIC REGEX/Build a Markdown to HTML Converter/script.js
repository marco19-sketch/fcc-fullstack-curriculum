const markdownInput = document.getElementById("markdown-input");
const htmlOutput = document.getElementById("html-output");
const preview = document.getElementById("preview");

function convertMarkdown() {
  const input = markdownInput.value;
  let output;
  
  const headingRegex = /^\s*(#{1,3}) (.+)/gm;
  output = input.replace(headingRegex, (_, hash, content) => {
    let level = hash.length;
    return `<h${level}>${content}</h${level}>`;
  });
  const boldRegex = /(\*\*|__)(.+)\1/gm;
  output = output.replace(
    boldRegex,
    (_, __, content) => `<strong>${content}</strong>`
  ); 
  const italicRegex = /(\*|_)(.+)\1/gm;
  output = output.replace(
    italicRegex,
    (_, __, content) => `<em>${content}</em>`
  ); 
  const imgRegex = /!\[(.+)\]\((.+)\)/gm;
  output = output.replace(
    imgRegex,
    (_, altText, source) => `<img alt='${altText}' src='${source}'>`
  );
  const linkRegex = /\[(.+)\]\((.+)\)/gm;
  output = output.replace(
    linkRegex,
    (_, linkText, url) => `<a href='${url}'>${linkText}</a>`
  );
  
  const quoteRegex = /^> (.*)/gm;
  output = output.replace(
    quoteRegex,
    (_, quote) => `<blockquote>${quote}</blockquote>`
  );
  console.log(output)
  return output;
}

markdownInput.addEventListener("input", () => {
  const outputRender = convertMarkdown();
  console.log(outputRender);
  htmlOutput.textContent = outputRender;
  preview.innerHTML = outputRender;
});
