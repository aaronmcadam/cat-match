import { Cat } from './api-schema';

// This is a domain entity, acting as an anti-corruption layer between our app
// and the data source.
export interface Photo {
  id: string;
  src: string;
}

// We could probably test this using Mock Service Worker to stub the API request.
export class PhotoRepository {
  /**
   * Returns a list of 24 photos in pairs of two.
   */
  public async all(): Promise<Photo[]> {
    // It looks like the size query param doesn't really return a smaller image
    // at all, so we're downloading files that are larger than we need.
    // We'll need to deal with slow performance on the front end.
    const limit = 12;
    const response = await fetch(
      `https://api.thecatapi.com/v1/images/search?limit=${limit}&order=RANDOM`
    );
    const data: Cat[] = await response.json();

    const photos: Photo[] = data.map((cat) => {
      return {
        id: cat.id,
        src: cat.url,
      };
    });

    // Duplicate the list photos to generate pairs and shuffle them.
    return photos.concat(photos).sort(() => 0.5 - Math.random());
  }
}
