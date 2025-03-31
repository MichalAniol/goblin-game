# Goblin Game

## uruchamianie

Otwieramy trzy okna terminala, wszystkie w katalogu projektu. najłatwiej z użyciem VSCode/VSCodium. W każdym kolejno wpisujemy i w każdym wchodzimy w ```code```.

1. ```npm run g``` - uruchamia składanie kodu ```*.html``` i ```*.css``` z katalogu ```src``` do katalogu ```prod```. obserwacja zmian jest ciągła i po zapisaniu pliku ```*.html``` lub ```*.css``` w katalogu ```src``` następuje ponowne złożenie plików.

2. ```npm run w``` - uruchamia local serwer z katalogu ```prod``` pod adresem ```http://localhost:3030``` (możliwość zmiany w pliku ```watch.js```). serwer przeładowuje się automatycznie przy zmianie któregokolwiek z plików w katalogu ```prod```.

3. ```npm run tsw``` - uruchamia składanie kodu ```*.js``` z katalogu ```src``` do katalogu ```prod```. obserwacja zmian jest ciągła i po zapisaniu pliku ```*.js``` w katalogu ```src``` następuje ponowne złożenie plików według kolejności zdefiniowanej w ```tsconfig.json```. Dla pojedynczego złożenia (bez ciągłości obserwacji plików) można użyć ```npm run tsb```. W VSCode/VSCodium można też użyć kombinacji klawiszy ```shift``` + ```ctrl``` + ```B``` i wybrać  ```tsc: monitoruj``` lub ```tsc: kompilacja```. Jeśli nie działa to zainstaluj: ```npm install -g typescript```.

## jak to działa?

w katalogu "assets-origin" jest plik blendera z gotowym ustawieniem do renderu monetki.
do wygenerowania pixelowego looku uzyłem: ```https://lucasroedel.gumroad.com/l/pixel_art```
jak uzyć: ```https://youtu.be/GkHaAJ-5Vs4```
po wyrenderowaniu klatek w png złozyłem je w css sprite za pomocą: ```https://spritegen.website-performance.org/```
wynik znajduje się w katalogu ```code/src/img```

w ```code/src/coin/coin.ts``` najpierw na podstawie ```code/src/img/stylesheet``` buduję listę dla ```backgroundPosition``` żeby potem tylko po niej iterować
funkcja ```coin.set()``` tworzy nową instancję monetki

w ```code/src/game.ts``` jest lista wszystkich funkcji które mają być wywołane w każdym update-cie
gdy monetka dochodzi do końca zakresu gdzie ma być widoczna zostaje usunięta jej funkcja update-tująca i jej element html

w ```code/src/_index.ts``` jest główna pętla gry. Tworzenie monetek działa na podstawie parametrów i jest dodane do listy update-ów w ```game``` co wyznaczoną liczbę klatek

opakowanie modułów w ```(function () { <body of function> }())``` powoduje przygotowanie modułow przed uruchomieniem programu i domyka zawartość (podobnie jak ```class```), a widoczne pozostają tylko elementy zwrócone przez ```return```