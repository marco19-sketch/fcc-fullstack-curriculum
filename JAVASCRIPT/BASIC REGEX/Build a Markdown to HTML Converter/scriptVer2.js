const input = document.getElementById("markdown-input");
const htmlOutput = document.getElementById("html-output");
const preview = document.getElementById("preview");

const headReg = /^\s*(#{1,6})\s+(.*)?/gm;
const boldReg = /\s*(\*\*|__)(.+)\1/gm;
const italicReg = /(\*|_)(.+)\1/gm;
const imgReg = /!\[(.+)\]\((.+)\)/gim;
const linkReg = /\[(.+)\]\((.+)\)/gim;
const quoteReg = /^> (.*)/gm;

const convertMarkdown = () => {
  const string = input.value;
  let output = "";

  output = string.replace(
    headReg,
    (_, $1, $2) => `<h${$1.length}>${$2}</h${$1.length}>`
  );

  output = output.replace(
    boldReg,
    (_, delim, text) => `<strong>${text}</strong>`
  );

  output = output.replace(
    italicReg,
    (_, before, delim, text) => `<em>${text}</em>`
  );

  output = output.replace(
    imgReg,
    (_, text, url) => `<img alt="${text}" src="${url}">`
  );

  output = output.replace(
    linkReg,
    (_, text, url) => `<a href='${url}'>${text}</a>'`
  );

  output = output.replace(
    quoteReg,
    (_, text) => `<blockquote>${text}</blockquote>`
  );
  console.log(output);
  return output;
};

input.addEventListener("input", () => {
  let htmlRender = convertMarkdown();
  htmlOutput.textContent = htmlRender;
  preview.innerHTML = htmlRender;
});
