using System.Runtime.Serialization;

namespace Models {

    [DataContract]

    public class UserStore
    {
        private List<User> _users;

        public UserStore()
        {
            _users = new List<User>();
        }

        public bool AddUser(User user)
        {
            if (_users.Any(u => u.userName == user.userName))
            {
                return false;
            }

            _users.Add(user);
            return true;
        }

        public User GetUser(string userName)
        {
            return _users.FirstOrDefault(u => u.userName == userName);
        }
    }
}