var n='.stage-header .stage-large {\n  position: relative;\n}\n\n.stage-header .stage-title {\n  width: 100%;\n}\n\n@media screen and (min-width: 320px) and (max-width: 799px) {\n  .stage-header .stage-title {\n    width: 50%;\n    float: left;\n  }\n}\n\n@media screen and (min-width: 799px) {\n  .stage-header .stage-title {\n    width: 100%;\n  }\n}\n\n.stage-header .stage-cta-box {\n  width: 100%;\n}\n\n@media screen and (min-width: 320px) and (max-width: 799px) {\n  .stage-header .stage-cta-box {\n    width: 50%;\n    float: right;\n  }\n}\n\n@media screen and (min-width: 799px) {\n  .stage-header .stage-cta-box {\n    width: 100%;\n  }\n}\n\n.stage-header .stage-cta {\n  padding: 0.2em 0.1em 0.5em 1em;\n  background-color: var(--color-cta);\n  height: 2em;\n  width: calc(15 * var(--base-unit));\n  position: relative;\n  display: inline-block;\n}\n\n.stage-header .stage-cta:link, .stage-header .stage-cta:visited, .stage-header .stage-cta:hover, .stage-header .stage-cta:active {\n  color: #fff;\n}\n\n@media screen and (min-width: 799px) {\n  .stage-header .stage-cta::after {\n    position: absolute;\n    left: 100%;\n    top: 0;\n    content: "";\n    width: 0;\n    height: 0;\n    border-style: solid;\n    border-width: 1em 0 1em 2em;\n    border-color: transparent transparent transparent var(--color-cta);\n  }\n}\n\n.stage-header .stage-overlay {\n  width: 100%;\n  padding: 0 var(--base-unit);\n}\n\n.stage-header .stage-overlay h2 {\n  margin-top: 0;\n}\n\n@media screen and (min-width: 799px) {\n  .stage-header .stage-overlay {\n    position: absolute;\n    right: 0;\n    top: 0;\n    padding: 0.625em;\n    width: 30%;\n    background-color: rgba(255 255 255 / 75%);\n    height: 100%;\n    border-bottom: none;\n  }\n\n  .stage-header .stage-overlay > * {\n    margin-left: var(--base-unit);\n  }\n}\n';export{n as css,n as default};
