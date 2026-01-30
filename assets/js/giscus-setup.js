function determineGiscusTheme() {
  
    return "";
  
}

(function setupGiscus() {
  let giscusTheme = determineGiscusTheme();

  let giscusAttributes = {
    src: "https://giscus.app/client.js",
    "data-repo": "lyushisyan/lyushisyan.github.io",
    "data-repo-id": "",
    "data-category": "",
    "data-category-id": "",
    "data-mapping": "",
    "data-strict": "",
    "data-reactions-enabled": "",
    "data-emit-metadata": "",
    "data-input-position": "",
    "data-theme": giscusTheme,
    "data-lang": "",
    crossorigin: "anonymous",
    async: true,
  };

  let giscusScript = document.createElement("script");
  Object.entries(giscusAttributes).forEach(([key, value]) =>
    giscusScript.setAttribute(key, value)
  );
  document.getElementById("giscus_thread").appendChild(giscusScript);
})();

