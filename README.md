# Cicás adatbáziskezelő weboldal
## Józsi által kiadott gyakorlófeladat
Az alapfeladat egy NestJS backend készítése volt, ami CRUD műveletekre képes MongoDB-ben. Ezután készítettem ehhez egy frontendet Next.js-ben, React komponenseket használva. Következő lépésnek egy login rendszert csináltam, ami JSON Web Token és cookie segítségével működik, valamint ehhez dinamikussá tettem a navbar-t. A formázásokhoz Tailwind CSS-t használtam, a titkosításhoz Dotenv -et.
A felhasználóknak van jogosultsági szintjük, ami a következők lehetnek:
- Reader
- Editor
- Admin
Ezek alapján különböző hozzáférésük van az adatbázishoz. A reader csak lekérni tud, az editor módosítani is. Az admin jogosultsággal rendelkező felhasználó, a többi felhasználó fiókját tudja módosítani: deaktiválni, törölni, jogosultságot adni.
