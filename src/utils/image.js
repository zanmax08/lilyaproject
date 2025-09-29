// Simple asset resolver helper.
// Use: resolveImg('liliagl.png') will attempt to import from src/assets.
// Falls back to returning the provided name if dynamic import fails, so dev doesn't crash.
export function resolveImg(name){
  try {
    return new URL(`../assets/${name}`, import.meta.url).href
  } catch (e) {
    return name
  }
}
