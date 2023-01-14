namespace Models {
    public class BreukService : IBreukOpteller {
        public int som(int a, int b) {
            return a + b;
        }
        public Breuk maakBreuk(int teller, int noemer) {
            return new Breuk(teller, noemer);
        }

        public Breuk somBreuken(Breuk een, Breuk twee) {
            return een.plus(twee);
        }

    }
}