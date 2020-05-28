export default function listenImagesLoading(images, callback) {
  images.forEach((img) => {
    if (img.complete) {
      callback();

      return;
    }

    img.addEventListener(
      'load',
      () => {
        callback();
      },
      { once: true },
    );
  });
}
