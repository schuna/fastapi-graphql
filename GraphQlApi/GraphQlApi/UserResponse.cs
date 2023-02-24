namespace GraphQlApi
{
    public class UserResponse
    {
        public UserContent User { get; set; }

        public class UserContent
        {
            public string email { get; set; }
            public int id { get; set; }
            public string username { get; set; }
            public string password { get; set; }
        }
    }
}