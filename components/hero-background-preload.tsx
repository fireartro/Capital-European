export function HeroBackgroundPreload({ selector }: { selector: string }) {
  const code = `
(function () {
  var heroContent = document.querySelector(${JSON.stringify(selector)});
  var heroContainer = heroContent && (heroContent.closest(".inner-hero") || heroContent.parentElement);
  if (!heroContainer) return;

  var backgroundImage = window.getComputedStyle(heroContainer).backgroundImage;
  var match = backgroundImage && backgroundImage.match(/url\\(["']?(.*?)["']?\\)/);
  var href = match && match[1];
  if (!href || href.indexOf("data:") === 0) return;

  var exists = Array.prototype.some.call(document.querySelectorAll('link[rel="preload"][as="image"]'), function (link) {
    return link.href === new URL(href, window.location.href).href;
  });
  if (exists) return;

  var preloadLink = document.createElement("link");
  preloadLink.rel = "preload";
  preloadLink.as = "image";
  preloadLink.href = href;
  preloadLink.fetchPriority = "high";
  preloadLink.setAttribute("fetchpriority", "high");
  document.head.appendChild(preloadLink);
})();
  `.trim();

  return <script dangerouslySetInnerHTML={{ __html: code }} />;
}
