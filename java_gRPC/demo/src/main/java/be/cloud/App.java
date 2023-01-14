package be.cloud;

/**
 * Hello world!
 *
 */
public class App 
{
    public static void main( String[] args )
    {
        System.out.println( "Hello World!" );
        Person john = Person.newBuilder()
                            .setId(1234)
                            .setName("John Doe")
                            .setEmail("jdoe@example.com")
                            .addPhones(
                            Person.PhoneNumber.newBuilder()
                                .setNumber("555-4321")
                                .setType(Person.PhoneType.HOME))
                            .build();

        AddressBook book = AddressBook.getDefaultInstance();

        AddPerson addPerson = new AddPerson();
        ListPeople peopleList = new ListPeople();
    }
}
