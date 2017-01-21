export const allPhotos = `{
  allPhotos(sortBy: "-id") {
    id
    caption
    tags { slug name photosCount }
    sizes {
      small { width height url }
      medium { width height url }
      large { width height url }
    }
    exif { captureTime exposure aperture iso focal }
  }
}`;

export const allTags = `{
  allTags(withEmpty: true) {
    slug
    name
    photosCount
  }
}`;

export const createTag = `mutation ($tag: Tag) {
  createTag(tag: $tag) {
    slug
    name
  }
}`;

export const allDesignProjects = `{
  allDesignProjects {
    id
    slug
    title
    subtitle
    date
    excerpt
    content
    raw
    coverImage
    images {
      id
      sizes {
        small { width height url }
        medium { width height url }
        large { width height url }
      }
    }
  }
}`;
