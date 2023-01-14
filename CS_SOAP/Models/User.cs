using System.Runtime.Serialization;

namespace Models {

    [DataContract]

    public class User
    {
        public string UUID { get; set; }
        public string userName { get; set; }
        public string password { get; set; }
    }
}