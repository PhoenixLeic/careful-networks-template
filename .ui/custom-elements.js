// =========================================
// Helpers
// =========================================
var infoPromise = beaker.hyperdrive.getInfo();

// =========================================
// Module: Header
// =========================================
class ModuleHeader extends HTMLElement {
  constructor() {
    super();
    this.render();
  }

  async render() {
    var info = await infoPromise;
    const span = this.querySelector(".header__artist");
    span.innerHTML = info.title;
  }
}

// =========================================
// Module: Media
// =========================================
class ModuleMedia extends HTMLElement {
  constructor() {
    super();
    this.render();
  }

  async render() {
    const type = this.getAttribute("type");

    if (type === "video") {
      this.renderVideo();
    }
  }

  renderVideo() {
    this.querySelector("span").innerHTML = "video";
  }
}

// =========================================
// Define all custom elements
// =========================================
customElements.define("module-header", ModuleHeader);
customElements.define("module-media", ModuleMedia);
