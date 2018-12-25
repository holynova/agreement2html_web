const log = console.log.bind(console)
var converter = new showdown.Converter()
function toMarkdown(str) {
  let clone = str
  let rules = [
    { from: /^\s*/g, to: "# " },
    { from: /^\s+/mg, to: "" },
    { from: /\t/mg, to: "    " },
    { from: /\s+\n/mg, to: "\n" },
    { from: /\n+/mg, to: "  \n" },
    { from: /^\d{1,2}、/mg, to: "1. " },
    { from: /(?=^[^\s0-9]{1,2}、)/mg, to: "## " },
    // { from: /\(\d{1,2}\)|（\d{1,2}）/mg, to: "\t\n1. " },
    {
      from: /\(\d{1,2}\)|（\d{1,2}）/mg,
      to: str => `  ${str}`
    },
    {
      from: /^第.{1,3}条/mg,
      to: str => `## ${str}`
    }

  ]
  for (let rule of rules) {
    let { from, to } = rule
    clone = clone.replace(from, to)
  }
  // // clone = `# ${clone}`
  // log('----------------------------------------')
  // log('----------------------------------------')
  // log(clone)
  // log('----------------------------------------')
  // log('----------------------------------------')
  return clone
}
function convert(text, inputType = 'plain') {
  if (text) {
    let md = inputType === 'markdown' ? text : toMarkdown(text)

    let html = converter.makeHtml(md)

    const fullHtml = `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><meta http-equiv="X-UA-Compatible" content="ie=edge"><title>Document</title><style>li,p,br {margin:0.4rem 0} html {font-size: 14px;line-height: 180%;text-align: justify;}html table {border-collapse: collapse;color: #3e3e3e;}html table,html th,html td {border: 1px solid #3e3e3e;font-size: 1rem;padding: 1rem;}html body .wrapper {margin: 0 auto;padding: 2rem;/* font-size: 0.8rem; */color: #3e3e3e;max-width: 800px;}html body .wrapper h1 {font-size: 1.2rem;color: #3367d6;text-align: center;}html body .wrapper h2 {font-size: 1.1rem;color: #3367d6;border-bottom: 1px solid #3367d6;padding-bottom: 0.5rem;}html body .wrapper .footer {text-align: right;}</style></head><body><div class="wrapper">${html}</div></body></html>`
    return fullHtml
  }
}




function main() {
  // log('ready')
  let input = document.getElementById('input')
  input.focus()
  let output = document.getElementById('output')
  // log(input.value)
  let btn = document.querySelector('.btn')
  btn.addEventListener('click', function (e) {
    let text = input.value
    let inputType = document.querySelector('input[name="inputType"]:checked').value
    let html = convert(text, inputType)
    if (html) {
      output.value = html
    }

  }, false)


  // input.addEventListener('change')
}


main()