export interface Movie {
    id: number;
    title: string;
    image: string;
    genre: string;
  }
  
  export const movies: Movie[] = [
    {
      id: 1,
      title: 'The Dark Dawn',
      image: '/banner1.jpg',
      genre: 'Action',
    },
    {
      id: 2,
      title: 'Laugh Riot',
      image: '/banner3.jpg',
      genre: 'Comedy',
    },
    {
      id: 3,
      title: 'Heart Beats',
      image: '/banner5.jpg',
      genre: 'Romance',
    },
    {
      id: 4,
      title: 'Ghosted',
      image: '/banner7.jpg',
      genre: 'Horror',
    },
  ];
  