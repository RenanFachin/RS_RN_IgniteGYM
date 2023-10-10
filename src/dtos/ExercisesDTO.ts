export type ExercisesDTO = {
  id: string;
  demo: string;
  group: string;
  name: string;
  repetitions:string;
  series: number;
  thumb: string;
}


// este é o retorno da API -> tipamos só o que vamos realmente utilizar
// [{"created_at": "2023-01-31 17:36:21", "demo": "rosca_punho.gif", "group": "antebraço", "id": 17, "name": "Rosca punho", "repetitions": 12, "series": 4, "thumb": "rosca_punho.png", "updated_at": "2023-01-31 17:36:21"}]