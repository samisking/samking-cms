export const allPhotos = `{
  allPhotos {
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
  allTags {
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
    coverImage
    content
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
