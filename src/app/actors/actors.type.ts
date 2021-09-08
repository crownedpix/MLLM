export interface actorType {
  female: Array<character>,
  male: Array<character>,
  BMI:Array<{id:string,type:string}>,
  waist:Array<{id:string,type:string}>,
  mod:Array<{id:string,type:string}>,
  ethinicity:Array<{id:string,type:string}>,
  size:Array<{id:string,type:string}>,
  group:Array<{type:string}>
}


export interface character {
  id: string,
  name: string,
  img: string,
  sex: string,
  eyeColor: string,
  hairColor: string,
  size: string,
  Height: string,
  weight: string,
  BMI: string,
  waist: string,
  mod: string,
  ethinicity: string,
  country: string,
  cups: string,
  startYear:string,
  DOB: string,
  count?: string,
  cream?:string
}
