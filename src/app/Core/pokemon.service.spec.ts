import { TestBed } from '@angular/core/testing';

import { PokemonService } from './pokemon.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';


describe('PokemonService - Data Assignment', () => {
  let service: PokemonService;
  let httpMock: HttpTestingController;
  let fetchedData: any;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PokemonService],
    });

    service = TestBed.inject(PokemonService);
    httpMock = TestBed.inject(HttpTestingController);
    fetchedData = null;
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should fetch Pokémon list and assign the data', () => {
    const mockResponse = {
      results: [
        { name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' },
        { name: 'ivysaur', url: 'https://pokeapi.co/api/v2/pokemon/2/' },
      ],
    };

    service.getPokemonList().subscribe((data) => {
      fetchedData = data;
      console.log('fetchedData', fetchedData);
    });

    const req = httpMock.expectOne((req) =>
      req.url === 'https://pokeapi.co/api/v2/pokemon'
    );
    req.flush(mockResponse); // Simulate a successful response

    expect(fetchedData).toBeTruthy();
    expect(fetchedData.results.length).toBe(2);
    expect(fetchedData.results[0].name).toBe('bulbasaur');
  });
});

