const syntaxHighlight = (code: string) => {
  code = escapeHTML(code);

  const rules = {
    // eslint-disable-next-line no-useless-escape
    attributes: /(?<=\s)\w+(?=\=)|(?<=\s)\w+(?=&gt;)/g,
    strings:
      /(&quot;|&#039;)(?<=(&quot;|&#039;)).+(?=(&quot;|&#039;))(&quot;|&#039;)/g,
    tags: /&lt;\w+&gt;|&lt;\/\w+&gt;|&lt;\w+|(?<=)\s\/&gt;|&lt;!DOCTYPE|(?<!--)&gt;/g,
    comments: /&lt;!--(?<=&lt;!--).+(?=--&gt;)--&gt;/g,
  };

  for (const [key, rule] of Object.entries(rules)) {
    code = code.replace(rule, (match) => {
      return `<span class="highlight-${key}">${match}</span>`;
    });
  }

  return code;
};

const escapeHTML = (unsafe: string): string => {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
};

export { syntaxHighlight, escapeHTML };
