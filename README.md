# KidFlow
## *Podział aplikacji:*
1. Administrator ze strony szkoły – jedna osoba
2. Nauczyciele
3. Rodzice

## *Schemat ogólny działania:*
- Każda szkoła dostaje unikalny identyfikator, do którego zostaną przypisani wszyscy nauczyciele, uczniowie i opiekunowie
- Do jednego rodzica może zostać przypisane wiele dzieci
- Dzieci mogą być przypisywane po adresach zamieszkania
- Dziecko mogą odbierać różni opiekunowie, ale tylko przypisani do dziecka lub zweryfikowani przez rodzica poprzez aplikację

### *Konto administratora:*
- Tworzenie kont nauczycielskich
- Przypisywanie dzieci do rodziców
- Administracja danymi -> zmiany, usuwanie, dodawanie
- Administracja kontami
- Wszystko musi być potwierdzane aby uniknąć pomyłek

### *Konto nauczyciela:*
- W momencie zaczęcia pracy nauczyciel loguje się ze swojego konta i potwierdza siebie jako osobę odpowiedzialną za świetlicę 
> *Rodzice może mogliby widzieć kto jest za nią odpowiedzialny danego dnia*
- Interfejs podzielony klasami
- Po kliknięciu na np. kafelek z numerem klasy wyświetla się lista obecności, w której nauczyciel zaznacza obecność dziecka na świetlicy
> *może potwierdza to?*
- Dzieci z defaulta są nieobecne
- Obok dzieci, których odebranie jest zaplanowane na określoną godzinę podana jest godzina
> *nie wiem na jak daleko do przodu można by planować odbiór, tydzień? Dzień?*
- Dziecko mogą odebrać tylko osoby do których jest przypisane na poziomie aplikacji oraz osoby upoważnione przez rodzica jeśli aplikacji mieć nie mogą (np. dziadek, babcia)
- W momencie próby odebrania dziecka przez rodzica wyskakuje na ekranie powiadomienie z danymi osoby odbierającej, muszą być kolejkowane zgodnie z czasem 
- Nauczyciel potwierdza gotowość podopiecznego do opuszczenia terenu szkoły, następnie po potwierdzeniu odbioru dziecka nauczyciel potwierdza opuszczenie placówki przez podopiecznego 
> *ewentualnie krótsza wersja bez dwóch ostatnich potwierdzeń*
- Automatycznie po potwierdzeniu odebrania dziecka przez opiekuna dziecko odznaczane jest jako nieobecne na liście
> *lub po potwierdzeniu opuszczenia szkoły, jak wyżej*
- Nauczyciel ma możliwość modyfikowania listy manualnie

### *Konto rodzica:*
- Rodzice zakładają konta tworząc login i hasło, dodatkowo używają ID szkoły oraz swoich danych osobowych, imię, nazwisko i coś unikalnego np. telefonów komórkowych lub miejsca zamieszkania
- Inni opiekunowie dzieci niż ich rodzice mogą je odbierać
- Osoby z możliwością posiadania aplikacji zakładają swoje konta tak samo jak rodzice, po czym administrator szkoły przypisuje do nich odpowiednie dziecko
- Opiekun loguje się do aplikacji używając loginu i hasła
- Interfejs przedstawia dzieci, które może odebrać, własne lub do których został upoważniony przez innego rodzica
- Przy dzieciach przedstawiona jest informacja o obecności na świetlicy
- Wybierając dziecko opiekun ma trzy opcje, odbierz dziecko teraz, zaplanuj odbiór dziecka, upoważnij kogoś innego do odbioru dziecka
- Wybór opcji odbierz dziecko teraz skutkuje wysłaniem powiadomienia na stronę nauczyciela
- Po potwierdzeniu gotowości dziecka przez nauczyciela, rodzic dostaje powiadomienie że dziecko jest gotowe do wyjścia
> *i teraz nie wiadomo czy coś jeszcze ma robić czy dziecko już może wychodzić, wg mnie powinien jeszcze potwierdzić odbiór po gotowości, żeby dziecko wyszło*
- Przy wyborze opcji zaplanuj odbiór dziecka wyskakują pola z zegarem i datą do wyboru terminu odbioru, po wybraniu rodzic potwierdza termin
- Tuż przed terminem, 10/15 min, raz albo kilkukrotnie(w razie braku potwierdzenia terminu odbioru) rodzic dostaje powiadomienie z prośbą o potwierdzenie terminu odbioru, zgoda ustawia termin definitywnie, odrzucenie usuwa termin odbioru
- Wybór opcji z upoważnieniem skutkuje w wyskoczeniem pól, w które należy wpisać dane osoby odbierającej
- Jeśli osoba odbierająca znajduje się w aplikacji, wyświetli się kafelek z nią podczas wpisywania danych, rodzic klika na dany kafelek i potwierdza upoważnienie tej osoby do odebrania, upoważnienie jest jednokrotne
> *ewentualnie może być też z terminem*
- Osoba upoważniona musi zgodzić się po swojej stronie na upoważnienie
- Odbiór dziecka przez osobę upoważnioną wygląda tak samo
- W razie braku osoby w bazie danych rodzic wpisuje manualnie dane do systemu, następnie przy potwierdzeniu wyskakuje powiadomienie że danej osoby nie ma w bazie danych czy ma zostać i tak upoważniona, wówczas nauczyciel powinien widzieć dane takiej osoby przy dziecku na liście obecności, takich sytuacji z założenia będzie bardzo mało
