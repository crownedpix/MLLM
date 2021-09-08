export interface movie {
  id: string,
  name: string,
  type: string,
  desc: string,
  url: Array<String>,
  video: string,
  star?:boolean,
  category: Array<{ id: string, name: string }>,
  creamtime: string,
  cream: string,
  group:string,
  actors: {
    female: Array<{ name: string, id: string }>,
    male: Array<{ name: string, id: string }>
  }
}
