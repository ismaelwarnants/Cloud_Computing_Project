using System.ServiceModel;

namespace Models {
    [ServiceContract]
    interface IBreukOpteller {
        [OperationContract]
        public int som(int a, int b);

        [OperationContract]
        public Breuk maakBreuk(int teller, int noemer);

        [OperationContract]
        public Breuk somBreuken(Breuk een, Breuk twee);

    }
}