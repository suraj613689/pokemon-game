import { Component } from '@angular/core';
import { PokemonService } from './Core/pokemon.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'pokemon-app';

  randomPokemon: any = null;
  pokemonList: Array<any> = [];
  pokemonNameOptions: Array<string> = [];
  isLoading: boolean = false;
  correctNameFlag: string;
  score: number = 0;

  constructor(private pokemonService: PokemonService) { }

  ngOnInit() {
    this.isLoading = true;
    this.pokemonService.getPokemonList().subscribe((response) => {
      this.pokemonList = response.results;
      this.showRandomPokemon();
    }, (error) => {
      this.isLoading = false;
    });
  }

  showRandomPokemon() {
    this.randomPokemon = this.pokemonList[Math.floor(Math.random() * this.pokemonList.length)];
    this.getRandomPokemon(this.randomPokemon)
    this.generateOptionsForRandomPokemon(this.pokemonList, this.randomPokemon?.name);
  }

  generateOptionsForRandomPokemon(pokemonList: any[], correctAnswer: string) {
    let options = [correctAnswer];
    while (options.length < 4) {
      const randomOption = pokemonList[Math.floor(Math.random() * pokemonList.length)].name;
      if (!options.includes(randomOption)) {
        options.push(randomOption);
      }
    }
    this.shufflOptions(options);
  }

  shufflOptions(array: string[]) {
    this.pokemonNameOptions = array.sort(() => Math.random() - 0.5);
  }

  getRandomPokemon(randomPokemon) {
    this.correctNameFlag = '';
    this.pokemonService.getPokemonByName(randomPokemon.name).subscribe((response) => {
      this.randomPokemon = response;
      this.isLoading = false
    }, error => {
      this.isLoading = false
    })
  }

  selectedPokemonName(name) {
    if (name == this.randomPokemon.name) {
      this.score += 50;
      this.correctNameFlag = "Correct"
    } else {
      this.score -= 50;
      this.correctNameFlag = "InCorrect"
    }
    setTimeout(() => {
      this.isLoading = true;
      this.showRandomPokemon();
    }, 2000);
  }
}
