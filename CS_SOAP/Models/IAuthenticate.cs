using System.ServiceModel;

namespace Models {
    [ServiceContract]
    interface IAuthenticate {
        [OperationContract]
        public string Login(string userName, string password);

        [OperationContract]
        public string CreateUser(string userName, string password);

    }
}