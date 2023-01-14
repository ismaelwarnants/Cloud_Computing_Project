using System.Runtime.Serialization;

namespace Models {

    [DataContract]
    public class Breuk {
        [DataMember]
        public int Teller {get; set;}
        [DataMember]
        public int Noemer {get; set;}
        

        public Breuk(int teller, int noemer=1) {
            int factor = gcd(teller, noemer);
            this.Teller = teller/factor;
            this.Noemer = noemer/factor;
        }

        private static int gcd(int a, int b) {
            if (b>a) return gcd(b,a);
            while (b>1) return gcd(b, a%b);
            return a;
        }

        public Breuk plus(Breuk twee) {
            int n2 = Noemer * twee.Noemer;
            int t2 = Teller * twee.Noemer + twee.Teller*Noemer;
            return new Breuk(t2, n2);
        }

    }
}