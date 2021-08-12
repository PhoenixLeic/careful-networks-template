const hyperDrives = [
  {
    artist: "Artist 0",
    url: "hyper://bb2921f4517abd9b2caccb1d312a94c87c71a0effa1a43a56b8ba34ead2d99fc/",
  },
  {
    artist: "Artist 1",
    url: "hyper://788eec7cd78706cd9c9b97ca000e0d083b2f2f2ddd8d16bad107189dd39c4ca0/",
  },
  {
    artist: "Artist 2",
    url: "hyper://45256fc59850959a7d59e9beedc16e382f719d2a0ebcc501a6d6a4fa9811bf1a/",
  },
  {
    artist: "Artist 3",
    url: "hyper://28df63ae6f1381e6e1ea047c5776abc47e971ae9406b2741ff76f1e7cb4f3b22/",
  },
];

let NAVIGATION = null;

function init() {
  NAVIGATION = document.querySelector(".navigation");

  pageSetup();
  buildNextButton();
  buildPrevButton();
}

async function pageSetup() {
  var main = document.querySelector(".page-container");
  if (location.pathname.endsWith(".html")) {
    let html = await beaker.hyperdrive
      .readFile(location.pathname)
      .catch((e) => `<h1>404 not found<h1>`);
    main.innerHTML = html;
  }
}

async function buildNextButton() {
  for (const drive of hyperDrives) {
    const info = await beaker.hyperdrive.getInfo(drive.url);
    console.log(`Info for drive belonging to ${drive.artist}: `, info);
    if (info.peers > 0) {
      renderNextButton(info);
      break;
    }
  }
}

async function buildPrevButton() {
  const currentDriveInfo = await beaker.hyperdrive.getInfo();
  const currentDriveIndex = hyperDrives.findIndex(
    (drive) => drive.url === currentDriveInfo.url
  );
  const previousDriveIndex =
    currentDriveIndex === 0 ? hyperDrives.length : currentDriveIndex - 1;
  const previousDriveInfo = await beaker.hyperdrive.getInfo(
    hyperDrives[previousDriveIndex].url
  );

  renderPrevButton(previousDriveInfo);
}

function renderNextButton({ url, title }) {
  NAVIGATION.innerHTML = `<li class="navigation__next"><a href="${url}">${title} &rarr;</a></li>`;
}

function renderPrevButton({ url, title }) {
  const oldHtml = NAVIGATION.innerHTML;

  NAVIGATION.innerHTML =
    oldHtml +
    `<li class="navigation__prev"><a href="${url}">${title} &rarr;</a></li>`;
}

function renderNavError() {
  NAVIGATION.innerHTML =
    "Looks like there are no hosts right now, sorry about that.";
}

init();
