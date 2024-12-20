const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    // create aircraft_seats seeder
    await prisma.aircraft_seats.createMany({
        data: [
            // A320
            {
                "aircraft_seat_id": "41607b68-c7e0-4e0c-a860-3933d73701fc",
                "aircraft_id": "8bf696ca-b0fc-4466-8fee-97f0bfcd0508",
                "aircraft_seat_position": "1A"
            },
            {
                "aircraft_seat_id": "9e2a7e8f-cf31-4fe3-a9c7-296ed862ce9a",
                "aircraft_id": "8bf696ca-b0fc-4466-8fee-97f0bfcd0508",
                "aircraft_seat_position": "1B"
            },
            {
                "aircraft_seat_id": "258c6f0d-f656-4f42-bcf6-9b50840e63a5",
                "aircraft_id": "8bf696ca-b0fc-4466-8fee-97f0bfcd0508",
                "aircraft_seat_position": "1C"
            },
            {
                "aircraft_seat_id": "9b83ffa9-a66c-41d9-a131-8fa16277e71b",
                "aircraft_id": "8bf696ca-b0fc-4466-8fee-97f0bfcd0508",
                "aircraft_seat_position": "1D"
            },
            {
                "aircraft_seat_id": "be52514f-1760-4d3d-aca3-7ad3f8d1e5de",
                "aircraft_id": "8bf696ca-b0fc-4466-8fee-97f0bfcd0508",
                "aircraft_seat_position": "1E"
            },
            {
                "aircraft_seat_id": "95de886c-104d-451c-98be-74285ef1203e",
                "aircraft_id": "8bf696ca-b0fc-4466-8fee-97f0bfcd0508",
                "aircraft_seat_position": "1F"
            },
            {
                "aircraft_seat_id": "a6624296-d744-42d1-b2e3-f823a6d76594",
                "aircraft_id": "8bf696ca-b0fc-4466-8fee-97f0bfcd0508",
                "aircraft_seat_position": "2A"
            },
            {
                "aircraft_seat_id": "89cf31b3-84a5-4d51-8cc9-2ee3f1ad7a59",
                "aircraft_id": "8bf696ca-b0fc-4466-8fee-97f0bfcd0508",
                "aircraft_seat_position": "2B"
            },
            {
                "aircraft_seat_id": "27cd286a-cda2-4714-8d5f-f8b8ced7d98f",
                "aircraft_id": "8bf696ca-b0fc-4466-8fee-97f0bfcd0508",
                "aircraft_seat_position": "2C"
            },
            {
                "aircraft_seat_id": "93399c67-c280-4ade-ba39-3579c7ea26ed",
                "aircraft_id": "8bf696ca-b0fc-4466-8fee-97f0bfcd0508",
                "aircraft_seat_position": "2D"
            },
            {
                "aircraft_seat_id": "243fa511-9a38-4f2f-a548-82872d55c306",
                "aircraft_id": "8bf696ca-b0fc-4466-8fee-97f0bfcd0508",
                "aircraft_seat_position": "2E"
            },
            {
                "aircraft_seat_id": "0cba663f-8b6d-4ebc-861b-31ba67da9ba1",
                "aircraft_id": "8bf696ca-b0fc-4466-8fee-97f0bfcd0508",
                "aircraft_seat_position": "2F"
            },
            {
                "aircraft_seat_id": "cabe8e12-e58f-440f-a864-13c610604d4a",
                "aircraft_id": "8bf696ca-b0fc-4466-8fee-97f0bfcd0508",
                "aircraft_seat_position": "3A"
            },
            {
                "aircraft_seat_id": "9a95f4aa-38d1-49bd-9855-89955f1dcf64",
                "aircraft_id": "8bf696ca-b0fc-4466-8fee-97f0bfcd0508",
                "aircraft_seat_position": "3B"
            },
            {
                "aircraft_seat_id": "bce01959-3713-412b-bc6e-4ef89ca44933",
                "aircraft_id": "8bf696ca-b0fc-4466-8fee-97f0bfcd0508",
                "aircraft_seat_position": "3C"
            },
            {
                "aircraft_seat_id": "f5b19a8d-f225-41b5-a0f3-5626f12f7060",
                "aircraft_id": "8bf696ca-b0fc-4466-8fee-97f0bfcd0508",
                "aircraft_seat_position": "3D"
            },
            {
                "aircraft_seat_id": "f6044ba9-e00f-4e24-8861-5cfc4bd3d480",
                "aircraft_id": "8bf696ca-b0fc-4466-8fee-97f0bfcd0508",
                "aircraft_seat_position": "3E"
            },
            {
                "aircraft_seat_id": "86afcffa-c2f0-49bc-a863-d89c6e6ce654",
                "aircraft_id": "8bf696ca-b0fc-4466-8fee-97f0bfcd0508",
                "aircraft_seat_position": "3F"
            },
            {
                "aircraft_seat_id": "7fb06851-4492-487d-a912-dbda4619eadd",
                "aircraft_id": "8bf696ca-b0fc-4466-8fee-97f0bfcd0508",
                "aircraft_seat_position": "4A"
            },
            {
                "aircraft_seat_id": "5a52057f-b23f-4737-95fd-43c80e0b0ed7",
                "aircraft_id": "8bf696ca-b0fc-4466-8fee-97f0bfcd0508",
                "aircraft_seat_position": "4B"
            },
            {
                "aircraft_seat_id": "63a5bdf3-9d5f-4192-9f95-9690f2ab7928",
                "aircraft_id": "8bf696ca-b0fc-4466-8fee-97f0bfcd0508",
                "aircraft_seat_position": "4C"
            },
            {
                "aircraft_seat_id": "551b2dcc-d0be-4f5b-a8cf-6d56c5e8733a",
                "aircraft_id": "8bf696ca-b0fc-4466-8fee-97f0bfcd0508",
                "aircraft_seat_position": "4D"
            },
            {
                "aircraft_seat_id": "c4c590a9-6b88-42f7-9c33-fd39862edbe9",
                "aircraft_id": "8bf696ca-b0fc-4466-8fee-97f0bfcd0508",
                "aircraft_seat_position": "4E"
            },
            {
                "aircraft_seat_id": "409242de-2ae4-4f68-8066-d25ee6084450",
                "aircraft_id": "8bf696ca-b0fc-4466-8fee-97f0bfcd0508",
                "aircraft_seat_position": "4F"
            },
            {
                "aircraft_seat_id": "5b23b55c-8067-4209-aaa3-a1cd5ebc26c0",
                "aircraft_id": "8bf696ca-b0fc-4466-8fee-97f0bfcd0508",
                "aircraft_seat_position": "5A"
            },
            {
                "aircraft_seat_id": "b04d175d-af6f-4b26-aefd-d94a09e3b4f5",
                "aircraft_id": "8bf696ca-b0fc-4466-8fee-97f0bfcd0508",
                "aircraft_seat_position": "5B"
            },
            {
                "aircraft_seat_id": "ce892a8b-046c-4fa6-a2ef-1ee615fe7c30",
                "aircraft_id": "8bf696ca-b0fc-4466-8fee-97f0bfcd0508",
                "aircraft_seat_position": "5C"
            },
            {
                "aircraft_seat_id": "539d3681-c90c-4654-b0d9-ce43d6fc82e4",
                "aircraft_id": "8bf696ca-b0fc-4466-8fee-97f0bfcd0508",
                "aircraft_seat_position": "5D"
            },
            {
                "aircraft_seat_id": "9a4dadf5-2b89-4381-aceb-c9a4429d3d4a",
                "aircraft_id": "8bf696ca-b0fc-4466-8fee-97f0bfcd0508",
                "aircraft_seat_position": "5E"
            },
            {
                "aircraft_seat_id": "e38987dd-7e7c-45f0-91c9-d32897ef4be0",
                "aircraft_id": "8bf696ca-b0fc-4466-8fee-97f0bfcd0508",
                "aircraft_seat_position": "5F"
            },
            {
                "aircraft_seat_id": "83e422d9-cee5-4e1f-9918-ff576dab4483",
                "aircraft_id": "8bf696ca-b0fc-4466-8fee-97f0bfcd0508",
                "aircraft_seat_position": "6A"
            },
            {
                "aircraft_seat_id": "34098847-ae2a-4195-9797-13f0a08b2506",
                "aircraft_id": "8bf696ca-b0fc-4466-8fee-97f0bfcd0508",
                "aircraft_seat_position": "6B"
            },
            {
                "aircraft_seat_id": "ef22a6f7-b7d5-46c9-80c7-fd8d5a904322",
                "aircraft_id": "8bf696ca-b0fc-4466-8fee-97f0bfcd0508",
                "aircraft_seat_position": "6C"
            },
            {
                "aircraft_seat_id": "410a25a9-c923-47ce-b882-5262eacb648d",
                "aircraft_id": "8bf696ca-b0fc-4466-8fee-97f0bfcd0508",
                "aircraft_seat_position": "6D"
            },
            {
                "aircraft_seat_id": "ff79ac7c-4fef-4c38-8003-7affe1a36b99",
                "aircraft_id": "8bf696ca-b0fc-4466-8fee-97f0bfcd0508",
                "aircraft_seat_position": "6E"
            },
            {
                "aircraft_seat_id": "dd3a7213-c73d-4e39-8dff-526943fc4d5e",
                "aircraft_id": "8bf696ca-b0fc-4466-8fee-97f0bfcd0508",
                "aircraft_seat_position": "6F"
            },
            {
                "aircraft_seat_id": "68503052-ccaf-49be-b7b3-d5e87b8993ea",
                "aircraft_id": "8bf696ca-b0fc-4466-8fee-97f0bfcd0508",
                "aircraft_seat_position": "7A"
            },
            {
                "aircraft_seat_id": "f9798c80-2ac5-441e-934a-3a3faaff8a11",
                "aircraft_id": "8bf696ca-b0fc-4466-8fee-97f0bfcd0508",
                "aircraft_seat_position": "7B"
            },
            {
                "aircraft_seat_id": "3f587b7f-c2f2-4a98-a175-8e1fdf3ec513",
                "aircraft_id": "8bf696ca-b0fc-4466-8fee-97f0bfcd0508",
                "aircraft_seat_position": "7C"
            },
            {
                "aircraft_seat_id": "c2858755-d4b3-4c8c-8f6e-5d006e36f3a9",
                "aircraft_id": "8bf696ca-b0fc-4466-8fee-97f0bfcd0508",
                "aircraft_seat_position": "7D"
            },
            {
                "aircraft_seat_id": "eb985d0f-747b-4927-8f28-2208daf8aab0",
                "aircraft_id": "8bf696ca-b0fc-4466-8fee-97f0bfcd0508",
                "aircraft_seat_position": "7E"
            },
            {
                "aircraft_seat_id": "dc62d5ac-f324-4050-aa8b-e21769e88786",
                "aircraft_id": "8bf696ca-b0fc-4466-8fee-97f0bfcd0508",
                "aircraft_seat_position": "7F"
            },
            {
                "aircraft_seat_id": "0bbd264e-088f-4f24-b515-79c934220bb1",
                "aircraft_id": "8bf696ca-b0fc-4466-8fee-97f0bfcd0508",
                "aircraft_seat_position": "8A"
            },
            {
                "aircraft_seat_id": "997aa100-4f51-45e6-a5e7-bf94dadce72c",
                "aircraft_id": "8bf696ca-b0fc-4466-8fee-97f0bfcd0508",
                "aircraft_seat_position": "8B"
            },
            {
                "aircraft_seat_id": "010da622-aa5a-4964-9557-af6c2819c2f1",
                "aircraft_id": "8bf696ca-b0fc-4466-8fee-97f0bfcd0508",
                "aircraft_seat_position": "8C"
            },
            {
                "aircraft_seat_id": "9ade45dc-180c-4f45-baf6-fe9ade8d5a57",
                "aircraft_id": "8bf696ca-b0fc-4466-8fee-97f0bfcd0508",
                "aircraft_seat_position": "8D"
            },
            {
                "aircraft_seat_id": "1db66bb3-ef96-4690-8d5e-5d6fa4de50a7",
                "aircraft_id": "8bf696ca-b0fc-4466-8fee-97f0bfcd0508",
                "aircraft_seat_position": "8E"
            },
            {
                "aircraft_seat_id": "f1947693-12c5-418a-8de3-a63ac0ee176c",
                "aircraft_id": "8bf696ca-b0fc-4466-8fee-97f0bfcd0508",
                "aircraft_seat_position": "8F"
            },
            {
                "aircraft_seat_id": "76a54da2-9e9e-49bc-aad4-ba648faac46e",
                "aircraft_id": "8bf696ca-b0fc-4466-8fee-97f0bfcd0508",
                "aircraft_seat_position": "9A"
            },
            {
                "aircraft_seat_id": "7d4bd9a2-aff7-45d5-bba1-3c4529f36130",
                "aircraft_id": "8bf696ca-b0fc-4466-8fee-97f0bfcd0508",
                "aircraft_seat_position": "9B"
            },
            {
                "aircraft_seat_id": "4c74f8b5-630b-408b-a25a-4a243df9f709",
                "aircraft_id": "8bf696ca-b0fc-4466-8fee-97f0bfcd0508",
                "aircraft_seat_position": "9C"
            },
            {
                "aircraft_seat_id": "859799c2-85d2-4330-bb7e-f7d935cbed34",
                "aircraft_id": "8bf696ca-b0fc-4466-8fee-97f0bfcd0508",
                "aircraft_seat_position": "9D"
            },
            {
                "aircraft_seat_id": "fa34f308-8f3c-4598-b0bc-fd64bb864b41",
                "aircraft_id": "8bf696ca-b0fc-4466-8fee-97f0bfcd0508",
                "aircraft_seat_position": "9E"
            },
            {
                "aircraft_seat_id": "25327b99-5acc-417e-b6c4-26ced21d31be",
                "aircraft_id": "8bf696ca-b0fc-4466-8fee-97f0bfcd0508",
                "aircraft_seat_position": "9F"
            },
            {
                "aircraft_seat_id": "98aa2d90-9a41-4d27-9a7a-c086be67ef53",
                "aircraft_id": "8bf696ca-b0fc-4466-8fee-97f0bfcd0508",
                "aircraft_seat_position": "10A"
            },
            {
                "aircraft_seat_id": "4dd4339c-33ca-4801-ad92-e168a73ad9f1",
                "aircraft_id": "8bf696ca-b0fc-4466-8fee-97f0bfcd0508",
                "aircraft_seat_position": "10B"
            },
            {
                "aircraft_seat_id": "b0ffbe11-8fad-46f5-89b5-9815bfe327f8",
                "aircraft_id": "8bf696ca-b0fc-4466-8fee-97f0bfcd0508",
                "aircraft_seat_position": "10C"
            },
            {
                "aircraft_seat_id": "20f6f186-d494-4024-aef3-b9f5084c7520",
                "aircraft_id": "8bf696ca-b0fc-4466-8fee-97f0bfcd0508",
                "aircraft_seat_position": "10D"
            },
            {
                "aircraft_seat_id": "f41d03cb-f1cc-4389-a7df-12d3df6750c5",
                "aircraft_id": "8bf696ca-b0fc-4466-8fee-97f0bfcd0508",
                "aircraft_seat_position": "10E"
            },
            {
                "aircraft_seat_id": "1178cf26-0666-4567-b84b-54c758b7f1dc",
                "aircraft_id": "8bf696ca-b0fc-4466-8fee-97f0bfcd0508",
                "aircraft_seat_position": "10F"
            },
            {
                "aircraft_seat_id": "7f291048-7013-4302-8273-52e532907144",
                "aircraft_id": "8bf696ca-b0fc-4466-8fee-97f0bfcd0508",
                "aircraft_seat_position": "11A"
            },
            {
                "aircraft_seat_id": "a31e6e9a-3bcc-4346-b9cf-c28195706bd0",
                "aircraft_id": "8bf696ca-b0fc-4466-8fee-97f0bfcd0508",
                "aircraft_seat_position": "11B"
            },
            {
                "aircraft_seat_id": "ca5d3ab5-b6fe-432b-a52c-82b9571626d7",
                "aircraft_id": "8bf696ca-b0fc-4466-8fee-97f0bfcd0508",
                "aircraft_seat_position": "11C"
            },
            {
                "aircraft_seat_id": "0a2197ff-7cb6-4116-9440-b45ee4c6f0b1",
                "aircraft_id": "8bf696ca-b0fc-4466-8fee-97f0bfcd0508",
                "aircraft_seat_position": "11D"
            },
            {
                "aircraft_seat_id": "f4fa7c46-9a26-47b8-a1aa-0660309748d2",
                "aircraft_id": "8bf696ca-b0fc-4466-8fee-97f0bfcd0508",
                "aircraft_seat_position": "11E"
            },
            {
                "aircraft_seat_id": "8cf00ba3-8229-4d8e-b64d-607b38509d5d",
                "aircraft_id": "8bf696ca-b0fc-4466-8fee-97f0bfcd0508",
                "aircraft_seat_position": "11F"
            },
            {
                "aircraft_seat_id": "566a0a07-ba9b-498f-9a37-ccb25ea222a3",
                "aircraft_id": "8bf696ca-b0fc-4466-8fee-97f0bfcd0508",
                "aircraft_seat_position": "12A"
            },
            {
                "aircraft_seat_id": "9ba46391-dc14-45b7-82ca-512ccdb2f61e",
                "aircraft_id": "8bf696ca-b0fc-4466-8fee-97f0bfcd0508",
                "aircraft_seat_position": "12B"
            },
            {
                "aircraft_seat_id": "e9b483d4-62fe-457c-bf40-de047779e959",
                "aircraft_id": "8bf696ca-b0fc-4466-8fee-97f0bfcd0508",
                "aircraft_seat_position": "12C"
            },
            {
                "aircraft_seat_id": "d5f9fa34-d0f8-4e56-bcd2-5daab554f9c3",
                "aircraft_id": "8bf696ca-b0fc-4466-8fee-97f0bfcd0508",
                "aircraft_seat_position": "12D"
            },
            {
                "aircraft_seat_id": "0d8688c0-e319-44c5-8ff8-d3043b1d10c0",
                "aircraft_id": "8bf696ca-b0fc-4466-8fee-97f0bfcd0508",
                "aircraft_seat_position": "12E"
            },
            {
                "aircraft_seat_id": "c3ec23d4-2be0-48f2-b5d8-3adc095bae1b",
                "aircraft_id": "8bf696ca-b0fc-4466-8fee-97f0bfcd0508",
                "aircraft_seat_position": "12F"
            },
            {
                "aircraft_seat_id": "90946c7d-e174-4b02-ba8f-cd58b1f950ac",
                "aircraft_id": "8bf696ca-b0fc-4466-8fee-97f0bfcd0508",
                "aircraft_seat_position": "13A"
            },
            {
                "aircraft_seat_id": "02c6749e-40be-4f65-a736-fad6f0332f55",
                "aircraft_id": "8bf696ca-b0fc-4466-8fee-97f0bfcd0508",
                "aircraft_seat_position": "13B"
            },
            {
                "aircraft_seat_id": "6bfea16e-efe8-4de8-935b-e5eaf70f2ef2",
                "aircraft_id": "8bf696ca-b0fc-4466-8fee-97f0bfcd0508",
                "aircraft_seat_position": "13C"
            },
            {
                "aircraft_seat_id": "3c6fe53f-02e3-4698-97a4-c9d0cc3385ca",
                "aircraft_id": "8bf696ca-b0fc-4466-8fee-97f0bfcd0508",
                "aircraft_seat_position": "13D"
            },
            {
                "aircraft_seat_id": "c742936b-dcab-470b-90d9-3617af6ea7cc",
                "aircraft_id": "8bf696ca-b0fc-4466-8fee-97f0bfcd0508",
                "aircraft_seat_position": "13E"
            },
            {
                "aircraft_seat_id": "b7d935a2-402f-49c0-b607-10756be1505a",
                "aircraft_id": "8bf696ca-b0fc-4466-8fee-97f0bfcd0508",
                "aircraft_seat_position": "13F"
            },
            {
                "aircraft_seat_id": "0882cc8b-839f-4cae-8d57-4128fd533002",
                "aircraft_id": "8bf696ca-b0fc-4466-8fee-97f0bfcd0508",
                "aircraft_seat_position": "14A"
            },
            {
                "aircraft_seat_id": "6182a623-9186-4d1f-987b-f9e3aa916355",
                "aircraft_id": "8bf696ca-b0fc-4466-8fee-97f0bfcd0508",
                "aircraft_seat_position": "14B"
            },
            {
                "aircraft_seat_id": "d394a4a6-d95d-4e96-8173-2cd3efccaf5b",
                "aircraft_id": "8bf696ca-b0fc-4466-8fee-97f0bfcd0508",
                "aircraft_seat_position": "14C"
            },
            {
                "aircraft_seat_id": "2f7ac0ba-1877-4909-a117-4f37db98ba40",
                "aircraft_id": "8bf696ca-b0fc-4466-8fee-97f0bfcd0508",
                "aircraft_seat_position": "14D"
            },
            {
                "aircraft_seat_id": "3324ef6c-535a-4f28-88f4-14154b9203cd",
                "aircraft_id": "8bf696ca-b0fc-4466-8fee-97f0bfcd0508",
                "aircraft_seat_position": "14E"
            },
            {
                "aircraft_seat_id": "f49541a2-0dad-48bd-be5f-d6b237a9a90a",
                "aircraft_id": "8bf696ca-b0fc-4466-8fee-97f0bfcd0508",
                "aircraft_seat_position": "14F"
            },
            {
                "aircraft_seat_id": "df95334f-9f27-4a41-92f0-8ddaefbba2d9",
                "aircraft_id": "8bf696ca-b0fc-4466-8fee-97f0bfcd0508",
                "aircraft_seat_position": "15A"
            },
            {
                "aircraft_seat_id": "e169520e-ac0d-4258-8dc3-6ccc636a5800",
                "aircraft_id": "8bf696ca-b0fc-4466-8fee-97f0bfcd0508",
                "aircraft_seat_position": "15B"
            },
            {
                "aircraft_seat_id": "c73824d4-c1e2-41ef-828a-abfcd371eead",
                "aircraft_id": "8bf696ca-b0fc-4466-8fee-97f0bfcd0508",
                "aircraft_seat_position": "15C"
            },
            {
                "aircraft_seat_id": "fcbce63f-6aaf-4c20-acc2-cffc29a68bb3",
                "aircraft_id": "8bf696ca-b0fc-4466-8fee-97f0bfcd0508",
                "aircraft_seat_position": "15D"
            },
            {
                "aircraft_seat_id": "6c9a4933-ebc4-4222-bfc5-c58e812e895b",
                "aircraft_id": "8bf696ca-b0fc-4466-8fee-97f0bfcd0508",
                "aircraft_seat_position": "15E"
            },
            {
                "aircraft_seat_id": "b7f6b7e6-5fcc-4292-9bce-17b9af7c79a0",
                "aircraft_id": "8bf696ca-b0fc-4466-8fee-97f0bfcd0508",
                "aircraft_seat_position": "15F"
            },
            {
                "aircraft_seat_id": "02c0a3aa-a5a8-49f2-acbb-4a0647aafbf9",
                "aircraft_id": "8bf696ca-b0fc-4466-8fee-97f0bfcd0508",
                "aircraft_seat_position": "16A"
            },
            {
                "aircraft_seat_id": "6ce2e6b8-fd90-4299-b507-63719bba71f7",
                "aircraft_id": "8bf696ca-b0fc-4466-8fee-97f0bfcd0508",
                "aircraft_seat_position": "16B"
            },
            {
                "aircraft_seat_id": "a98331f3-3584-4b8f-ba24-39d828e81ef6",
                "aircraft_id": "8bf696ca-b0fc-4466-8fee-97f0bfcd0508",
                "aircraft_seat_position": "16C"
            },
            {
                "aircraft_seat_id": "668dd8f3-af89-40b9-8bc4-a532ccaa4968",
                "aircraft_id": "8bf696ca-b0fc-4466-8fee-97f0bfcd0508",
                "aircraft_seat_position": "16D"
            },
            {
                "aircraft_seat_id": "0a2fe54c-154f-420d-82a1-28a618add8dc",
                "aircraft_id": "8bf696ca-b0fc-4466-8fee-97f0bfcd0508",
                "aircraft_seat_position": "16E"
            },
            {
                "aircraft_seat_id": "d50645b3-f177-428e-83d3-6a24b7a3626b",
                "aircraft_id": "8bf696ca-b0fc-4466-8fee-97f0bfcd0508",
                "aircraft_seat_position": "16F"
            },
            {
                "aircraft_seat_id": "3207856f-0021-4756-a6e2-6360428cb0a8",
                "aircraft_id": "8bf696ca-b0fc-4466-8fee-97f0bfcd0508",
                "aircraft_seat_position": "17A"
            },
            {
                "aircraft_seat_id": "d0582a6d-944f-4c1d-ae78-f3307d1abc1f",
                "aircraft_id": "8bf696ca-b0fc-4466-8fee-97f0bfcd0508",
                "aircraft_seat_position": "17B"
            },
            {
                "aircraft_seat_id": "6b7106c3-8acf-4d7a-b9f1-556583c89b2e",
                "aircraft_id": "8bf696ca-b0fc-4466-8fee-97f0bfcd0508",
                "aircraft_seat_position": "17C"
            },
            {
                "aircraft_seat_id": "edd4b664-28ea-4108-bc7d-23ea18ce23cd",
                "aircraft_id": "8bf696ca-b0fc-4466-8fee-97f0bfcd0508",
                "aircraft_seat_position": "17D"
            },
            {
                "aircraft_seat_id": "bf91ce0d-97aa-4f76-9ad4-11a872a8d5a2",
                "aircraft_id": "8bf696ca-b0fc-4466-8fee-97f0bfcd0508",
                "aircraft_seat_position": "17E"
            },
            {
                "aircraft_seat_id": "dc1a80ad-f495-48b9-ae94-055292ac0f81",
                "aircraft_id": "8bf696ca-b0fc-4466-8fee-97f0bfcd0508",
                "aircraft_seat_position": "17F"
            },
            {
                "aircraft_seat_id": "c436fa73-3f0e-4b1a-bd19-1216eec26c2e",
                "aircraft_id": "8bf696ca-b0fc-4466-8fee-97f0bfcd0508",
                "aircraft_seat_position": "18A"
            },
            {
                "aircraft_seat_id": "434abef2-632d-47ae-ac3f-a4cb564d770a",
                "aircraft_id": "8bf696ca-b0fc-4466-8fee-97f0bfcd0508",
                "aircraft_seat_position": "18B"
            },
            {
                "aircraft_seat_id": "b0ce2671-37b0-479b-a95e-c9119d1d38aa",
                "aircraft_id": "8bf696ca-b0fc-4466-8fee-97f0bfcd0508",
                "aircraft_seat_position": "18C"
            },
            {
                "aircraft_seat_id": "6b997519-5087-4236-b52b-4923d6e6f2fa",
                "aircraft_id": "8bf696ca-b0fc-4466-8fee-97f0bfcd0508",
                "aircraft_seat_position": "18D"
            },
            {
                "aircraft_seat_id": "7e0714d4-5489-440d-afc9-ac4f619f959e",
                "aircraft_id": "8bf696ca-b0fc-4466-8fee-97f0bfcd0508",
                "aircraft_seat_position": "18E"
            },
            {
                "aircraft_seat_id": "10fc3ae4-8ce6-4efd-8a21-5cca5eab9ac8",
                "aircraft_id": "8bf696ca-b0fc-4466-8fee-97f0bfcd0508",
                "aircraft_seat_position": "18F"
            },
            {
                "aircraft_seat_id": "fc6c1f66-5ea0-4a11-8950-f2ac642c9c27",
                "aircraft_id": "8bf696ca-b0fc-4466-8fee-97f0bfcd0508",
                "aircraft_seat_position": "19A"
            },
            {
                "aircraft_seat_id": "445abe02-0382-422a-b8b1-6d9877fe97ca",
                "aircraft_id": "8bf696ca-b0fc-4466-8fee-97f0bfcd0508",
                "aircraft_seat_position": "19B"
            },
            {
                "aircraft_seat_id": "934bf677-6243-4f62-bbb1-b7e2f1f0c1d6",
                "aircraft_id": "8bf696ca-b0fc-4466-8fee-97f0bfcd0508",
                "aircraft_seat_position": "19C"
            },
            {
                "aircraft_seat_id": "0ef7f71c-e138-4e36-92d5-61710bfa8f75",
                "aircraft_id": "8bf696ca-b0fc-4466-8fee-97f0bfcd0508",
                "aircraft_seat_position": "19D"
            },
            {
                "aircraft_seat_id": "c069e466-6f64-44db-a345-204127d1a12f",
                "aircraft_id": "8bf696ca-b0fc-4466-8fee-97f0bfcd0508",
                "aircraft_seat_position": "19E"
            },
            {
                "aircraft_seat_id": "28374fb4-0f1c-4327-ba2a-3060167bd04c",
                "aircraft_id": "8bf696ca-b0fc-4466-8fee-97f0bfcd0508",
                "aircraft_seat_position": "19F"
            },
            {
                "aircraft_seat_id": "2f30f1ea-c98b-4155-a22a-b899be3837dd",
                "aircraft_id": "8bf696ca-b0fc-4466-8fee-97f0bfcd0508",
                "aircraft_seat_position": "20A"
            },
            {
                "aircraft_seat_id": "0d1516b8-e56e-4737-a188-fc6b288817f0",
                "aircraft_id": "8bf696ca-b0fc-4466-8fee-97f0bfcd0508",
                "aircraft_seat_position": "20B"
            },
            {
                "aircraft_seat_id": "607cc7d4-743f-4173-9bec-f28d4838b4b1",
                "aircraft_id": "8bf696ca-b0fc-4466-8fee-97f0bfcd0508",
                "aircraft_seat_position": "20C"
            },
            {
                "aircraft_seat_id": "a4c9392b-44f3-4876-872d-84374b94f0ce",
                "aircraft_id": "8bf696ca-b0fc-4466-8fee-97f0bfcd0508",
                "aircraft_seat_position": "20D"
            },
            {
                "aircraft_seat_id": "98b87ce5-82f6-4734-9dde-54701468e641",
                "aircraft_id": "8bf696ca-b0fc-4466-8fee-97f0bfcd0508",
                "aircraft_seat_position": "20E"
            },
            {
                "aircraft_seat_id": "9c8e1eae-958e-41a6-b7dc-9d6d16efe3dc",
                "aircraft_id": "8bf696ca-b0fc-4466-8fee-97f0bfcd0508",
                "aircraft_seat_position": "20F"
            },
            {
                "aircraft_seat_id": "bcf0a40c-310e-48fd-aae1-ef2bd8828ff5",
                "aircraft_id": "8bf696ca-b0fc-4466-8fee-97f0bfcd0508",
                "aircraft_seat_position": "21A"
            },
            {
                "aircraft_seat_id": "c0451729-cda0-44d0-bf58-9182a23c4651",
                "aircraft_id": "8bf696ca-b0fc-4466-8fee-97f0bfcd0508",
                "aircraft_seat_position": "21B"
            },
            {
                "aircraft_seat_id": "9d466098-5159-445d-a6ad-0e9b0c0d5b60",
                "aircraft_id": "8bf696ca-b0fc-4466-8fee-97f0bfcd0508",
                "aircraft_seat_position": "21C"
            },
            {
                "aircraft_seat_id": "6192cdd6-15df-4341-becc-f355cc2b6aa0",
                "aircraft_id": "8bf696ca-b0fc-4466-8fee-97f0bfcd0508",
                "aircraft_seat_position": "21D"
            },
            {
                "aircraft_seat_id": "b174f15b-58b1-4daa-b886-91a573275a85",
                "aircraft_id": "8bf696ca-b0fc-4466-8fee-97f0bfcd0508",
                "aircraft_seat_position": "21E"
            },
            {
                "aircraft_seat_id": "e9dbb023-00fd-4255-9991-4c8f747f1203",
                "aircraft_id": "8bf696ca-b0fc-4466-8fee-97f0bfcd0508",
                "aircraft_seat_position": "21F"
            },
            {
                "aircraft_seat_id": "96756701-f1c8-44d5-be6b-922f4f39f725",
                "aircraft_id": "8bf696ca-b0fc-4466-8fee-97f0bfcd0508",
                "aircraft_seat_position": "22A"
            },
            {
                "aircraft_seat_id": "68be8182-3ed5-4790-9751-3a58d85f96b8",
                "aircraft_id": "8bf696ca-b0fc-4466-8fee-97f0bfcd0508",
                "aircraft_seat_position": "22B"
            },
            {
                "aircraft_seat_id": "9d77d4f9-d733-4338-8893-c19e3e1b8691",
                "aircraft_id": "8bf696ca-b0fc-4466-8fee-97f0bfcd0508",
                "aircraft_seat_position": "22C"
            },
            {
                "aircraft_seat_id": "b5c71ab5-97a1-48ea-a456-4b977da86161",
                "aircraft_id": "8bf696ca-b0fc-4466-8fee-97f0bfcd0508",
                "aircraft_seat_position": "22D"
            },
            {
                "aircraft_seat_id": "ed017801-50f9-4df8-9559-da99d0abb3c5",
                "aircraft_id": "8bf696ca-b0fc-4466-8fee-97f0bfcd0508",
                "aircraft_seat_position": "22E"
            },
            {
                "aircraft_seat_id": "66b9eb61-ff32-412a-85f5-3c8bfb18208c",
                "aircraft_id": "8bf696ca-b0fc-4466-8fee-97f0bfcd0508",
                "aircraft_seat_position": "22F"
            },
            {
                "aircraft_seat_id": "dc1132d1-0942-460b-9176-7d86767dc488",
                "aircraft_id": "8bf696ca-b0fc-4466-8fee-97f0bfcd0508",
                "aircraft_seat_position": "23A"
            },
            {
                "aircraft_seat_id": "19379667-d03a-4c59-98de-6bb43a6b678a",
                "aircraft_id": "8bf696ca-b0fc-4466-8fee-97f0bfcd0508",
                "aircraft_seat_position": "23B"
            },
            {
                "aircraft_seat_id": "8a9feafc-82d0-4133-85ce-77e6138f85e6",
                "aircraft_id": "8bf696ca-b0fc-4466-8fee-97f0bfcd0508",
                "aircraft_seat_position": "23C"
            },
            {
                "aircraft_seat_id": "a4fb65a2-92c9-47d7-818a-6839930070ac",
                "aircraft_id": "8bf696ca-b0fc-4466-8fee-97f0bfcd0508",
                "aircraft_seat_position": "23D"
            },
            {
                "aircraft_seat_id": "131ece8b-26f3-4b83-8d26-0afa783666cb",
                "aircraft_id": "8bf696ca-b0fc-4466-8fee-97f0bfcd0508",
                "aircraft_seat_position": "23E"
            },
            {
                "aircraft_seat_id": "61001e16-3473-42e9-9657-9f4c7b44227e",
                "aircraft_id": "8bf696ca-b0fc-4466-8fee-97f0bfcd0508",
                "aircraft_seat_position": "23F"
            },
            {
                "aircraft_seat_id": "19301d02-286c-4a7b-8462-1c43e4c241e8",
                "aircraft_id": "8bf696ca-b0fc-4466-8fee-97f0bfcd0508",
                "aircraft_seat_position": "24A"
            },
            {
                "aircraft_seat_id": "b6b0bf18-9830-4b8f-9169-5a19ffdb7291",
                "aircraft_id": "8bf696ca-b0fc-4466-8fee-97f0bfcd0508",
                "aircraft_seat_position": "24B"
            },
            {
                "aircraft_seat_id": "a044ff59-3a3f-4b79-945f-b56c019fdb0f",
                "aircraft_id": "8bf696ca-b0fc-4466-8fee-97f0bfcd0508",
                "aircraft_seat_position": "24C"
            },
            {
                "aircraft_seat_id": "e203bc5a-0f4e-4b0e-a2f5-5b78099397f1",
                "aircraft_id": "8bf696ca-b0fc-4466-8fee-97f0bfcd0508",
                "aircraft_seat_position": "24D"
            },
            {
                "aircraft_seat_id": "c92cf641-b5e9-456f-9ff4-9c6c20f2c347",
                "aircraft_id": "8bf696ca-b0fc-4466-8fee-97f0bfcd0508",
                "aircraft_seat_position": "24E"
            },
            {
                "aircraft_seat_id": "7a7107d7-86d8-4921-b5a6-0039abde4b1f",
                "aircraft_id": "8bf696ca-b0fc-4466-8fee-97f0bfcd0508",
                "aircraft_seat_position": "24F"
            },
            {
                "aircraft_seat_id": "9b832a0e-73ae-4226-a646-67e13b180b30",
                "aircraft_id": "8bf696ca-b0fc-4466-8fee-97f0bfcd0508",
                "aircraft_seat_position": "25A"
            },
            {
                "aircraft_seat_id": "6178a21f-7beb-47d9-967d-18092cf281b0",
                "aircraft_id": "8bf696ca-b0fc-4466-8fee-97f0bfcd0508",
                "aircraft_seat_position": "25B"
            },
            {
                "aircraft_seat_id": "3c06df1f-9fe8-42f5-ba62-3cd6eebd1c0e",
                "aircraft_id": "8bf696ca-b0fc-4466-8fee-97f0bfcd0508",
                "aircraft_seat_position": "25C"
            },
            {
                "aircraft_seat_id": "1bd15e26-1a80-413c-a292-1c461fcb0289",
                "aircraft_id": "8bf696ca-b0fc-4466-8fee-97f0bfcd0508",
                "aircraft_seat_position": "25D"
            },
            {
                "aircraft_seat_id": "9d154732-0c13-437f-8d87-fb4f0c9d3404",
                "aircraft_id": "8bf696ca-b0fc-4466-8fee-97f0bfcd0508",
                "aircraft_seat_position": "25E"
            },
            {
                "aircraft_seat_id": "472ba5a3-8011-497a-b9e1-dbf209e05563",
                "aircraft_id": "8bf696ca-b0fc-4466-8fee-97f0bfcd0508",
                "aircraft_seat_position": "25F"
            },
            {
                "aircraft_seat_id": "bab1b712-0f98-40d4-88c7-f605f5968ad3",
                "aircraft_id": "8bf696ca-b0fc-4466-8fee-97f0bfcd0508",
                "aircraft_seat_position": "26A"
            },
            {
                "aircraft_seat_id": "d042b53d-2aca-41fb-8547-cab1bfe8667a",
                "aircraft_id": "8bf696ca-b0fc-4466-8fee-97f0bfcd0508",
                "aircraft_seat_position": "26B"
            },
            {
                "aircraft_seat_id": "9db56ef1-a5fa-479d-917d-4c4b86f46c16",
                "aircraft_id": "8bf696ca-b0fc-4466-8fee-97f0bfcd0508",
                "aircraft_seat_position": "26C"
            },
            {
                "aircraft_seat_id": "5b2ee47a-097c-402a-a915-18367945c08d",
                "aircraft_id": "8bf696ca-b0fc-4466-8fee-97f0bfcd0508",
                "aircraft_seat_position": "26D"
            },
            {
                "aircraft_seat_id": "4ce3abf9-33b6-4183-8804-b2681e2b6c3a",
                "aircraft_id": "8bf696ca-b0fc-4466-8fee-97f0bfcd0508",
                "aircraft_seat_position": "26E"
            },
            {
                "aircraft_seat_id": "618b48bc-ece3-4d1d-a661-b8831cbe37e8",
                "aircraft_id": "8bf696ca-b0fc-4466-8fee-97f0bfcd0508",
                "aircraft_seat_position": "26F"
            },
            {
                "aircraft_seat_id": "e6935634-c5e4-4eb4-8ba3-1899675fccb2",
                "aircraft_id": "8bf696ca-b0fc-4466-8fee-97f0bfcd0508",
                "aircraft_seat_position": "27A"
            },
            {
                "aircraft_seat_id": "5e1da0f7-8ff7-4b70-bd0d-344dc7bcc012",
                "aircraft_id": "8bf696ca-b0fc-4466-8fee-97f0bfcd0508",
                "aircraft_seat_position": "27B"
            },
            {
                "aircraft_seat_id": "efe7fb81-7b23-4140-bc87-ea9910437905",
                "aircraft_id": "8bf696ca-b0fc-4466-8fee-97f0bfcd0508",
                "aircraft_seat_position": "27C"
            },
            {
                "aircraft_seat_id": "3c8ceca7-2f23-44dc-8f4b-15b85a566bd2",
                "aircraft_id": "8bf696ca-b0fc-4466-8fee-97f0bfcd0508",
                "aircraft_seat_position": "27D"
            },
            {
                "aircraft_seat_id": "e326a6aa-5bbe-47dc-a92e-ca01fcde0121",
                "aircraft_id": "8bf696ca-b0fc-4466-8fee-97f0bfcd0508",
                "aircraft_seat_position": "27E"
            },
            {
                "aircraft_seat_id": "6d539a28-5c93-4ac4-9ab1-aaf7bc6440a5",
                "aircraft_id": "8bf696ca-b0fc-4466-8fee-97f0bfcd0508",
                "aircraft_seat_position": "27F"
            },
            {
                "aircraft_seat_id": "fc8e3bed-178b-41d8-b3c7-44a699437be5",
                "aircraft_id": "8bf696ca-b0fc-4466-8fee-97f0bfcd0508",
                "aircraft_seat_position": "28A"
            },
            {
                "aircraft_seat_id": "fbaedd2d-01e0-4525-bcae-324685099319",
                "aircraft_id": "8bf696ca-b0fc-4466-8fee-97f0bfcd0508",
                "aircraft_seat_position": "28B"
            },
            {
                "aircraft_seat_id": "9d9cfe18-0388-40a6-99a5-211efc9ebe8c",
                "aircraft_id": "8bf696ca-b0fc-4466-8fee-97f0bfcd0508",
                "aircraft_seat_position": "28C"
            },
            {
                "aircraft_seat_id": "bd4eae40-a34a-4ce5-b7ea-14eca4155f3f",
                "aircraft_id": "8bf696ca-b0fc-4466-8fee-97f0bfcd0508",
                "aircraft_seat_position": "28D"
            },
            {
                "aircraft_seat_id": "a642bfda-f93a-4ebe-827a-4dc2ec9bfa12",
                "aircraft_id": "8bf696ca-b0fc-4466-8fee-97f0bfcd0508",
                "aircraft_seat_position": "28E"
            },
            {
                "aircraft_seat_id": "43893b2a-0419-458a-addc-d854d4fe78c6",
                "aircraft_id": "8bf696ca-b0fc-4466-8fee-97f0bfcd0508",
                "aircraft_seat_position": "28F"
            },
            {
                "aircraft_seat_id": "912e9070-26bb-4c96-970d-ba150ffddf81",
                "aircraft_id": "8bf696ca-b0fc-4466-8fee-97f0bfcd0508",
                "aircraft_seat_position": "29A"
            },
            {
                "aircraft_seat_id": "96fcc154-8004-4163-b572-14fef731e00f",
                "aircraft_id": "8bf696ca-b0fc-4466-8fee-97f0bfcd0508",
                "aircraft_seat_position": "29B"
            },
            {
                "aircraft_seat_id": "08f996bb-d362-46a0-b173-8da754182d9c",
                "aircraft_id": "8bf696ca-b0fc-4466-8fee-97f0bfcd0508",
                "aircraft_seat_position": "29C"
            },
            {
                "aircraft_seat_id": "4c7e31ee-ccf0-4dbf-8008-e9d7d25ff2fe",
                "aircraft_id": "8bf696ca-b0fc-4466-8fee-97f0bfcd0508",
                "aircraft_seat_position": "29D"
            },
            {
                "aircraft_seat_id": "405b16d3-e83c-464e-9ff9-5852c969abc7",
                "aircraft_id": "8bf696ca-b0fc-4466-8fee-97f0bfcd0508",
                "aircraft_seat_position": "29E"
            },
            {
                "aircraft_seat_id": "46d687c7-c0a2-454e-a628-b8623b01af35",
                "aircraft_id": "8bf696ca-b0fc-4466-8fee-97f0bfcd0508",
                "aircraft_seat_position": "29F"
            },
            {
                "aircraft_seat_id": "133d4f4a-3091-4688-9350-965d258e8bdd",
                "aircraft_id": "8bf696ca-b0fc-4466-8fee-97f0bfcd0508",
                "aircraft_seat_position": "30A"
            },
            {
                "aircraft_seat_id": "4664e777-2e4d-4dc8-bf92-8650096ebf2e",
                "aircraft_id": "8bf696ca-b0fc-4466-8fee-97f0bfcd0508",
                "aircraft_seat_position": "30B"
            },
            {
                "aircraft_seat_id": "4f955a10-4286-4fda-8af5-f105c13de896",
                "aircraft_id": "8bf696ca-b0fc-4466-8fee-97f0bfcd0508",
                "aircraft_seat_position": "30C"
            },
            {
                "aircraft_seat_id": "8fa9044e-b53d-4759-9134-d260f8e93069",
                "aircraft_id": "8bf696ca-b0fc-4466-8fee-97f0bfcd0508",
                "aircraft_seat_position": "30D"
            },
            {
                "aircraft_seat_id": "ee9ff162-ea3d-4b85-a7d9-351a88bbd4e1",
                "aircraft_id": "8bf696ca-b0fc-4466-8fee-97f0bfcd0508",
                "aircraft_seat_position": "30E"
            },
            {
                "aircraft_seat_id": "c0a11817-d3ee-4c4a-8fb6-19022614bd07",
                "aircraft_id": "8bf696ca-b0fc-4466-8fee-97f0bfcd0508",
                "aircraft_seat_position": "30F"
            },

            // B738
            {
                "aircraft_seat_id": "99abe125-1bde-481e-bab7-bb3476efeef1",
                "aircraft_id": "8bf696ca-b0fc-4466-8fee-97f0bfcd0z81",
                "aircraft_seat_position": "1A"
            },
            {
                "aircraft_seat_id": "5d1b5fa8-1c33-4f7c-a13f-c39b78da23cf",
                "aircraft_id": "8bf696ca-b0fc-4466-8fee-97f0bfcd0z81",
                "aircraft_seat_position": "1B"
            },
            {
                "aircraft_seat_id": "a7b06ffd-0326-4ec5-8567-886ca03a1739",
                "aircraft_id": "8bf696ca-b0fc-4466-8fee-97f0bfcd0z81",
                "aircraft_seat_position": "1C"
            },
            {
                "aircraft_seat_id": "3452b21b-303f-4944-a249-8225cbd96dfe",
                "aircraft_id": "8bf696ca-b0fc-4466-8fee-97f0bfcd0z81",
                "aircraft_seat_position": "1D"
            },
            {
                "aircraft_seat_id": "72d90e65-d8f2-4b3c-b2c5-99f936d4609e",
                "aircraft_id": "8bf696ca-b0fc-4466-8fee-97f0bfcd0z81",
                "aircraft_seat_position": "1E"
            },
            {
                "aircraft_seat_id": "52827eb9-433c-4d87-951f-b51a56b98c60",
                "aircraft_id": "8bf696ca-b0fc-4466-8fee-97f0bfcd0z81",
                "aircraft_seat_position": "1F"
            },
            {
                "aircraft_seat_id": "e19b8248-b4c3-4453-a020-35aa0df7d4fb",
                "aircraft_id": "8bf696ca-b0fc-4466-8fee-97f0bfcd0z81",
                "aircraft_seat_position": "2A"
            },
            {
                "aircraft_seat_id": "3e0d2621-d0d6-41fb-b79d-5d138a1b7e95",
                "aircraft_id": "8bf696ca-b0fc-4466-8fee-97f0bfcd0z81",
                "aircraft_seat_position": "2B"
            },
            {
                "aircraft_seat_id": "da35826d-f41f-4b58-80b1-8bfaaa59af73",
                "aircraft_id": "8bf696ca-b0fc-4466-8fee-97f0bfcd0z81",
                "aircraft_seat_position": "2C"
            },
            {
                "aircraft_seat_id": "eb6a61f9-cc42-4180-895d-d86b52a74641",
                "aircraft_id": "8bf696ca-b0fc-4466-8fee-97f0bfcd0z81",
                "aircraft_seat_position": "2D"
            },
            {
                "aircraft_seat_id": "0a19fa17-c5a9-4a74-ac32-4abdbcf8b31a",
                "aircraft_id": "8bf696ca-b0fc-4466-8fee-97f0bfcd0z81",
                "aircraft_seat_position": "2E"
            },
            {
                "aircraft_seat_id": "e86f33c4-35b4-45ac-9b74-fcee832a0348",
                "aircraft_id": "8bf696ca-b0fc-4466-8fee-97f0bfcd0z81",
                "aircraft_seat_position": "2F"
            },
            {
                "aircraft_seat_id": "869430b2-c184-45b5-aaed-0b9196640724",
                "aircraft_id": "8bf696ca-b0fc-4466-8fee-97f0bfcd0z81",
                "aircraft_seat_position": "3A"
            },
            {
                "aircraft_seat_id": "572fa908-48af-439c-b656-7351da9ba046",
                "aircraft_id": "8bf696ca-b0fc-4466-8fee-97f0bfcd0z81",
                "aircraft_seat_position": "3B"
            },
            {
                "aircraft_seat_id": "f33f0983-1510-4ac2-a4ff-dd10411755a4",
                "aircraft_id": "8bf696ca-b0fc-4466-8fee-97f0bfcd0z81",
                "aircraft_seat_position": "3C"
            },
            {
                "aircraft_seat_id": "d377ebf4-ef81-4aba-9d65-399f7724c531",
                "aircraft_id": "8bf696ca-b0fc-4466-8fee-97f0bfcd0z81",
                "aircraft_seat_position": "3D"
            },
            {
                "aircraft_seat_id": "9e793f35-12fc-4f6c-81d5-4aa94c3aa06a",
                "aircraft_id": "8bf696ca-b0fc-4466-8fee-97f0bfcd0z81",
                "aircraft_seat_position": "3E"
            },
            {
                "aircraft_seat_id": "7712ca6c-e144-4405-8c73-fa47b8749f26",
                "aircraft_id": "8bf696ca-b0fc-4466-8fee-97f0bfcd0z81",
                "aircraft_seat_position": "3F"
            },
            {
                "aircraft_seat_id": "5da8f97d-83d3-4d79-9019-23d8fd3a7ab0",
                "aircraft_id": "8bf696ca-b0fc-4466-8fee-97f0bfcd0z81",
                "aircraft_seat_position": "4A"
            },
            {
                "aircraft_seat_id": "28b65c83-df38-4213-8c63-f81433e2064d",
                "aircraft_id": "8bf696ca-b0fc-4466-8fee-97f0bfcd0z81",
                "aircraft_seat_position": "4B"
            },
            {
                "aircraft_seat_id": "5d58b3cf-b669-44f6-b6df-f496d70e7663",
                "aircraft_id": "8bf696ca-b0fc-4466-8fee-97f0bfcd0z81",
                "aircraft_seat_position": "4C"
            },
            {
                "aircraft_seat_id": "c409a294-611b-4ec8-b4bd-3399fa41e06c",
                "aircraft_id": "8bf696ca-b0fc-4466-8fee-97f0bfcd0z81",
                "aircraft_seat_position": "4D"
            },
            {
                "aircraft_seat_id": "e07c6ea7-2626-4bb4-8e26-5ace2f07ace1",
                "aircraft_id": "8bf696ca-b0fc-4466-8fee-97f0bfcd0z81",
                "aircraft_seat_position": "4E"
            },
            {
                "aircraft_seat_id": "cf25e17e-90b8-4e23-8652-93c61c974196",
                "aircraft_id": "8bf696ca-b0fc-4466-8fee-97f0bfcd0z81",
                "aircraft_seat_position": "4F"
            },
            {
                "aircraft_seat_id": "5443ef0c-2c46-4aea-870f-d6f9c45019aa",
                "aircraft_id": "8bf696ca-b0fc-4466-8fee-97f0bfcd0z81",
                "aircraft_seat_position": "5A"
            },
            {
                "aircraft_seat_id": "c856a90e-b98d-47b4-aa60-89480fa4f455",
                "aircraft_id": "8bf696ca-b0fc-4466-8fee-97f0bfcd0z81",
                "aircraft_seat_position": "5B"
            },
            {
                "aircraft_seat_id": "feab1925-acd9-47cc-b327-41a0eed4f232",
                "aircraft_id": "8bf696ca-b0fc-4466-8fee-97f0bfcd0z81",
                "aircraft_seat_position": "5C"
            },
            {
                "aircraft_seat_id": "8205b752-0f7c-4680-bf4a-73e035b28681",
                "aircraft_id": "8bf696ca-b0fc-4466-8fee-97f0bfcd0z81",
                "aircraft_seat_position": "5D"
            },
            {
                "aircraft_seat_id": "208f7151-cbfd-47f9-9152-26fc8493b092",
                "aircraft_id": "8bf696ca-b0fc-4466-8fee-97f0bfcd0z81",
                "aircraft_seat_position": "5E"
            },
            {
                "aircraft_seat_id": "8543c81b-9e8b-4101-933d-75c195dec6be",
                "aircraft_id": "8bf696ca-b0fc-4466-8fee-97f0bfcd0z81",
                "aircraft_seat_position": "5F"
            },
            {
                "aircraft_seat_id": "9f3e4823-edfa-4aa1-84fe-c418a087407c",
                "aircraft_id": "8bf696ca-b0fc-4466-8fee-97f0bfcd0z81",
                "aircraft_seat_position": "6A"
            },
            {
                "aircraft_seat_id": "43f83f9b-6071-4fa3-b2d6-629206a63b25",
                "aircraft_id": "8bf696ca-b0fc-4466-8fee-97f0bfcd0z81",
                "aircraft_seat_position": "6B"
            },
            {
                "aircraft_seat_id": "32920f94-855a-4643-a697-5ad803a10d7f",
                "aircraft_id": "8bf696ca-b0fc-4466-8fee-97f0bfcd0z81",
                "aircraft_seat_position": "6C"
            },
            {
                "aircraft_seat_id": "c481832b-e215-443e-9e88-932107d8dbca",
                "aircraft_id": "8bf696ca-b0fc-4466-8fee-97f0bfcd0z81",
                "aircraft_seat_position": "6D"
            },
            {
                "aircraft_seat_id": "b1a28b85-d25f-4fde-b02b-3874518a5905",
                "aircraft_id": "8bf696ca-b0fc-4466-8fee-97f0bfcd0z81",
                "aircraft_seat_position": "6E"
            },
            {
                "aircraft_seat_id": "5bb6c247-58a9-4034-83b2-b49bf6c4a499",
                "aircraft_id": "8bf696ca-b0fc-4466-8fee-97f0bfcd0z81",
                "aircraft_seat_position": "6F"
            },
            {
                "aircraft_seat_id": "ee81d8d9-b895-4d95-a02e-12c940612404",
                "aircraft_id": "8bf696ca-b0fc-4466-8fee-97f0bfcd0z81",
                "aircraft_seat_position": "7A"
            },
            {
                "aircraft_seat_id": "2281f056-5d91-4ec7-b66b-1198c91d0e24",
                "aircraft_id": "8bf696ca-b0fc-4466-8fee-97f0bfcd0z81",
                "aircraft_seat_position": "7B"
            },
            {
                "aircraft_seat_id": "31e0bc1e-c52a-4d92-8bd6-2f515d1f057d",
                "aircraft_id": "8bf696ca-b0fc-4466-8fee-97f0bfcd0z81",
                "aircraft_seat_position": "7C"
            },
            {
                "aircraft_seat_id": "fdb00998-b315-4415-b753-8fb4f7e04429",
                "aircraft_id": "8bf696ca-b0fc-4466-8fee-97f0bfcd0z81",
                "aircraft_seat_position": "7D"
            },
            {
                "aircraft_seat_id": "c27fc5df-32b0-4654-8a4c-12b8c727a155",
                "aircraft_id": "8bf696ca-b0fc-4466-8fee-97f0bfcd0z81",
                "aircraft_seat_position": "7E"
            },
            {
                "aircraft_seat_id": "1c5e042d-482d-4175-bf2f-60401930cce4",
                "aircraft_id": "8bf696ca-b0fc-4466-8fee-97f0bfcd0z81",
                "aircraft_seat_position": "7F"
            },
            {
                "aircraft_seat_id": "c8c2cf7e-ca34-4275-bbaf-fb8ccd798db0",
                "aircraft_id": "8bf696ca-b0fc-4466-8fee-97f0bfcd0z81",
                "aircraft_seat_position": "8A"
            },
            {
                "aircraft_seat_id": "0ecd4949-0c35-4d0a-997d-677413a18e2f",
                "aircraft_id": "8bf696ca-b0fc-4466-8fee-97f0bfcd0z81",
                "aircraft_seat_position": "8B"
            },
            {
                "aircraft_seat_id": "e733bf34-9a05-4638-9a83-73f2b1e18bbc",
                "aircraft_id": "8bf696ca-b0fc-4466-8fee-97f0bfcd0z81",
                "aircraft_seat_position": "8C"
            },
            {
                "aircraft_seat_id": "d8bc1b7e-06de-4470-9446-67c5c57476bb",
                "aircraft_id": "8bf696ca-b0fc-4466-8fee-97f0bfcd0z81",
                "aircraft_seat_position": "8D"
            },
            {
                "aircraft_seat_id": "6805bf81-d5eb-4854-835b-b6cfa1af9899",
                "aircraft_id": "8bf696ca-b0fc-4466-8fee-97f0bfcd0z81",
                "aircraft_seat_position": "8E"
            },
            {
                "aircraft_seat_id": "7a4f8fa0-fdc7-42cd-8fd4-1bd1239c4389",
                "aircraft_id": "8bf696ca-b0fc-4466-8fee-97f0bfcd0z81",
                "aircraft_seat_position": "8F"
            },
            {
                "aircraft_seat_id": "c5c1ba21-0e7f-4a2f-b0bb-a1704d97662f",
                "aircraft_id": "8bf696ca-b0fc-4466-8fee-97f0bfcd0z81",
                "aircraft_seat_position": "9A"
            },
            {
                "aircraft_seat_id": "270fc3e4-cce7-4d70-9061-b35de8747a03",
                "aircraft_id": "8bf696ca-b0fc-4466-8fee-97f0bfcd0z81",
                "aircraft_seat_position": "9B"
            },
            {
                "aircraft_seat_id": "2e017cc8-90c4-4a95-b809-82ff30c2bab4",
                "aircraft_id": "8bf696ca-b0fc-4466-8fee-97f0bfcd0z81",
                "aircraft_seat_position": "9C"
            },
            {
                "aircraft_seat_id": "3f34563a-d7f9-4fd1-9664-d9de9533acff",
                "aircraft_id": "8bf696ca-b0fc-4466-8fee-97f0bfcd0z81",
                "aircraft_seat_position": "9D"
            },
            {
                "aircraft_seat_id": "6450f9bc-3821-4d94-93f5-67f7cb1c18cd",
                "aircraft_id": "8bf696ca-b0fc-4466-8fee-97f0bfcd0z81",
                "aircraft_seat_position": "9E"
            },
            {
                "aircraft_seat_id": "a555f338-86ef-440a-9448-cc8f8fc4c9cf",
                "aircraft_id": "8bf696ca-b0fc-4466-8fee-97f0bfcd0z81",
                "aircraft_seat_position": "9F"
            },
            {
                "aircraft_seat_id": "81e12864-9cd8-4844-9bd8-708a9955f793",
                "aircraft_id": "8bf696ca-b0fc-4466-8fee-97f0bfcd0z81",
                "aircraft_seat_position": "10A"
            },
            {
                "aircraft_seat_id": "e81713d5-c240-4f4b-8f11-edeaabdada5e",
                "aircraft_id": "8bf696ca-b0fc-4466-8fee-97f0bfcd0z81",
                "aircraft_seat_position": "10B"
            },
            {
                "aircraft_seat_id": "b1d10ba2-cedf-41d0-b877-59ec40700481",
                "aircraft_id": "8bf696ca-b0fc-4466-8fee-97f0bfcd0z81",
                "aircraft_seat_position": "10C"
            },
            {
                "aircraft_seat_id": "19184701-08c1-4baf-b3df-4ba0b802ca17",
                "aircraft_id": "8bf696ca-b0fc-4466-8fee-97f0bfcd0z81",
                "aircraft_seat_position": "10D"
            },
            {
                "aircraft_seat_id": "818f4ac8-bdc7-4d71-a996-1f55eda5dd4a",
                "aircraft_id": "8bf696ca-b0fc-4466-8fee-97f0bfcd0z81",
                "aircraft_seat_position": "10E"
            },
            {
                "aircraft_seat_id": "49637db0-9a03-4d60-ad7f-9a72e77cc72b",
                "aircraft_id": "8bf696ca-b0fc-4466-8fee-97f0bfcd0z81",
                "aircraft_seat_position": "10F"
            },
            {
                "aircraft_seat_id": "837ff12c-7f6e-4c59-b712-7caf86bab159",
                "aircraft_id": "8bf696ca-b0fc-4466-8fee-97f0bfcd0z81",
                "aircraft_seat_position": "11A"
            },
            {
                "aircraft_seat_id": "b3f07fe2-0750-4dbe-8747-61bf3859beaa",
                "aircraft_id": "8bf696ca-b0fc-4466-8fee-97f0bfcd0z81",
                "aircraft_seat_position": "11B"
            },
            {
                "aircraft_seat_id": "8d1107d2-5263-46e2-a7b9-a6d5cfaf43c1",
                "aircraft_id": "8bf696ca-b0fc-4466-8fee-97f0bfcd0z81",
                "aircraft_seat_position": "11C"
            },
            {
                "aircraft_seat_id": "0cbfe09e-e2a8-4742-a455-10ebb2a8502f",
                "aircraft_id": "8bf696ca-b0fc-4466-8fee-97f0bfcd0z81",
                "aircraft_seat_position": "11D"
            },
            {
                "aircraft_seat_id": "885841c0-fb39-41e2-ab5a-704e7fe8c89e",
                "aircraft_id": "8bf696ca-b0fc-4466-8fee-97f0bfcd0z81",
                "aircraft_seat_position": "11E"
            },
            {
                "aircraft_seat_id": "c4e2e0ed-cf62-4172-87f3-43b428c3365a",
                "aircraft_id": "8bf696ca-b0fc-4466-8fee-97f0bfcd0z81",
                "aircraft_seat_position": "11F"
            },
            {
                "aircraft_seat_id": "3175dd52-153e-4b03-aa4d-bf6f533f8983",
                "aircraft_id": "8bf696ca-b0fc-4466-8fee-97f0bfcd0z81",
                "aircraft_seat_position": "12A"
            },
            {
                "aircraft_seat_id": "d4bdcbb7-e0f3-4075-b4c9-0062fd20ef10",
                "aircraft_id": "8bf696ca-b0fc-4466-8fee-97f0bfcd0z81",
                "aircraft_seat_position": "12B"
            },
            {
                "aircraft_seat_id": "8ffe600a-a0ab-4f7e-ba39-012b0eba7292",
                "aircraft_id": "8bf696ca-b0fc-4466-8fee-97f0bfcd0z81",
                "aircraft_seat_position": "12C"
            },
            {
                "aircraft_seat_id": "64d205af-1df7-43eb-95a9-68c98ce1f034",
                "aircraft_id": "8bf696ca-b0fc-4466-8fee-97f0bfcd0z81",
                "aircraft_seat_position": "12D"
            },
            {
                "aircraft_seat_id": "6064dbff-6c80-418f-92b1-8355d172f1ca",
                "aircraft_id": "8bf696ca-b0fc-4466-8fee-97f0bfcd0z81",
                "aircraft_seat_position": "12E"
            },
            {
                "aircraft_seat_id": "9eeec8ef-a430-4347-a8f3-6c93291cdac2",
                "aircraft_id": "8bf696ca-b0fc-4466-8fee-97f0bfcd0z81",
                "aircraft_seat_position": "12F"
            },
            {
                "aircraft_seat_id": "f57a6744-31d1-456f-a1bc-8025db830d6c",
                "aircraft_id": "8bf696ca-b0fc-4466-8fee-97f0bfcd0z81",
                "aircraft_seat_position": "13A"
            },
            {
                "aircraft_seat_id": "ee57bcff-930e-4c9a-943b-c6c3d14f625c",
                "aircraft_id": "8bf696ca-b0fc-4466-8fee-97f0bfcd0z81",
                "aircraft_seat_position": "13B"
            },
            {
                "aircraft_seat_id": "78043a5e-601c-4eb5-85bd-6a352c0d699b",
                "aircraft_id": "8bf696ca-b0fc-4466-8fee-97f0bfcd0z81",
                "aircraft_seat_position": "13C"
            },
            {
                "aircraft_seat_id": "1256253d-a1eb-49de-92ae-b3a5fae668ea",
                "aircraft_id": "8bf696ca-b0fc-4466-8fee-97f0bfcd0z81",
                "aircraft_seat_position": "13D"
            },
            {
                "aircraft_seat_id": "890e6f60-8c8f-4bb5-bbd0-338c62b2f32a",
                "aircraft_id": "8bf696ca-b0fc-4466-8fee-97f0bfcd0z81",
                "aircraft_seat_position": "13E"
            },
            {
                "aircraft_seat_id": "84f5f18a-e5d1-427e-aa25-64792f235046",
                "aircraft_id": "8bf696ca-b0fc-4466-8fee-97f0bfcd0z81",
                "aircraft_seat_position": "13F"
            },
            {
                "aircraft_seat_id": "f02d3ac1-6aed-4949-b522-121a2e80549d",
                "aircraft_id": "8bf696ca-b0fc-4466-8fee-97f0bfcd0z81",
                "aircraft_seat_position": "14A"
            },
            {
                "aircraft_seat_id": "c8e34f9a-8482-4eda-a812-64cba05c80ac",
                "aircraft_id": "8bf696ca-b0fc-4466-8fee-97f0bfcd0z81",
                "aircraft_seat_position": "14B"
            },
            {
                "aircraft_seat_id": "cb61abe8-16ef-41bb-bb6f-bb7d45caee83",
                "aircraft_id": "8bf696ca-b0fc-4466-8fee-97f0bfcd0z81",
                "aircraft_seat_position": "14C"
            },
            {
                "aircraft_seat_id": "d543e895-00a0-4c2b-811f-db3876d5a112",
                "aircraft_id": "8bf696ca-b0fc-4466-8fee-97f0bfcd0z81",
                "aircraft_seat_position": "14D"
            },
            {
                "aircraft_seat_id": "94e1ef38-b69e-4ba5-b8c0-62c082da274d",
                "aircraft_id": "8bf696ca-b0fc-4466-8fee-97f0bfcd0z81",
                "aircraft_seat_position": "14E"
            },
            {
                "aircraft_seat_id": "60598dcf-78b1-419d-9f4b-697d29399858",
                "aircraft_id": "8bf696ca-b0fc-4466-8fee-97f0bfcd0z81",
                "aircraft_seat_position": "14F"
            },
            {
                "aircraft_seat_id": "40206318-9be6-402a-b91a-a7f90046cbb3",
                "aircraft_id": "8bf696ca-b0fc-4466-8fee-97f0bfcd0z81",
                "aircraft_seat_position": "15A"
            },
            {
                "aircraft_seat_id": "c08af00f-d1c0-4521-a88d-33e221faf99b",
                "aircraft_id": "8bf696ca-b0fc-4466-8fee-97f0bfcd0z81",
                "aircraft_seat_position": "15B"
            },
            {
                "aircraft_seat_id": "ff80cfba-e631-4780-86be-a4490bc32d4d",
                "aircraft_id": "8bf696ca-b0fc-4466-8fee-97f0bfcd0z81",
                "aircraft_seat_position": "15C"
            },
            {
                "aircraft_seat_id": "90a306b7-d39a-4382-a8e2-cd23c675aad0",
                "aircraft_id": "8bf696ca-b0fc-4466-8fee-97f0bfcd0z81",
                "aircraft_seat_position": "15D"
            },
            {
                "aircraft_seat_id": "5a308d5d-1858-4778-b5e5-604d1aefb0f1",
                "aircraft_id": "8bf696ca-b0fc-4466-8fee-97f0bfcd0z81",
                "aircraft_seat_position": "15E"
            },
            {
                "aircraft_seat_id": "1f1973e5-d20d-413c-b482-3f9d9da2763e",
                "aircraft_id": "8bf696ca-b0fc-4466-8fee-97f0bfcd0z81",
                "aircraft_seat_position": "15F"
            },
            {
                "aircraft_seat_id": "9b6b83b6-7906-4893-9ae3-91a912df7962",
                "aircraft_id": "8bf696ca-b0fc-4466-8fee-97f0bfcd0z81",
                "aircraft_seat_position": "16A"
            },
            {
                "aircraft_seat_id": "1f65034e-2cb5-4009-adf6-840cd5fa53fc",
                "aircraft_id": "8bf696ca-b0fc-4466-8fee-97f0bfcd0z81",
                "aircraft_seat_position": "16B"
            },
            {
                "aircraft_seat_id": "be1c812c-e18f-4266-a58c-1a94a0d75457",
                "aircraft_id": "8bf696ca-b0fc-4466-8fee-97f0bfcd0z81",
                "aircraft_seat_position": "16C"
            },
            {
                "aircraft_seat_id": "cf614a0e-0302-4aba-97c7-1727afe79d6c",
                "aircraft_id": "8bf696ca-b0fc-4466-8fee-97f0bfcd0z81",
                "aircraft_seat_position": "16D"
            },
            {
                "aircraft_seat_id": "a6fac697-89e9-4988-8c32-8f036f220c11",
                "aircraft_id": "8bf696ca-b0fc-4466-8fee-97f0bfcd0z81",
                "aircraft_seat_position": "16E"
            },
            {
                "aircraft_seat_id": "18fbe7a2-c2b3-4fad-8a31-f09a0d0319df",
                "aircraft_id": "8bf696ca-b0fc-4466-8fee-97f0bfcd0z81",
                "aircraft_seat_position": "16F"
            },
            {
                "aircraft_seat_id": "f9a0db76-7ad9-4129-943d-625b15cf03ce",
                "aircraft_id": "8bf696ca-b0fc-4466-8fee-97f0bfcd0z81",
                "aircraft_seat_position": "17A"
            },
            {
                "aircraft_seat_id": "60f5d5c8-e66f-497d-9d8d-0af127be0277",
                "aircraft_id": "8bf696ca-b0fc-4466-8fee-97f0bfcd0z81",
                "aircraft_seat_position": "17B"
            },
            {
                "aircraft_seat_id": "2b579573-d120-4f91-ac39-23564ec7cadd",
                "aircraft_id": "8bf696ca-b0fc-4466-8fee-97f0bfcd0z81",
                "aircraft_seat_position": "17C"
            },
            {
                "aircraft_seat_id": "eafb0442-7bc8-410e-9a3b-fc8f2422971d",
                "aircraft_id": "8bf696ca-b0fc-4466-8fee-97f0bfcd0z81",
                "aircraft_seat_position": "17D"
            },
            {
                "aircraft_seat_id": "92fbc48e-d367-42ae-b80d-f9e0719ffbd6",
                "aircraft_id": "8bf696ca-b0fc-4466-8fee-97f0bfcd0z81",
                "aircraft_seat_position": "17E"
            },
            {
                "aircraft_seat_id": "f9294d42-75f6-4306-8ff2-5ab4a1ee0ece",
                "aircraft_id": "8bf696ca-b0fc-4466-8fee-97f0bfcd0z81",
                "aircraft_seat_position": "17F"
            },
            {
                "aircraft_seat_id": "ed9e6728-a4c4-4264-beb5-355f5336ccd8",
                "aircraft_id": "8bf696ca-b0fc-4466-8fee-97f0bfcd0z81",
                "aircraft_seat_position": "18A"
            },
            {
                "aircraft_seat_id": "3a1d38a5-5388-4135-81bc-97a6dce6ba7a",
                "aircraft_id": "8bf696ca-b0fc-4466-8fee-97f0bfcd0z81",
                "aircraft_seat_position": "18B"
            },
            {
                "aircraft_seat_id": "b217cd7b-2157-46b8-aa41-d94e3530bc28",
                "aircraft_id": "8bf696ca-b0fc-4466-8fee-97f0bfcd0z81",
                "aircraft_seat_position": "18C"
            },
            {
                "aircraft_seat_id": "0f7fba89-1751-4389-b672-5711e3dfba7f",
                "aircraft_id": "8bf696ca-b0fc-4466-8fee-97f0bfcd0z81",
                "aircraft_seat_position": "18D"
            },
            {
                "aircraft_seat_id": "418f8647-f95f-46e1-accd-2b412be8e84c",
                "aircraft_id": "8bf696ca-b0fc-4466-8fee-97f0bfcd0z81",
                "aircraft_seat_position": "18E"
            },
            {
                "aircraft_seat_id": "5cdc9bc6-7802-4fd3-b6eb-c19a3dd26132",
                "aircraft_id": "8bf696ca-b0fc-4466-8fee-97f0bfcd0z81",
                "aircraft_seat_position": "18F"
            },
            {
                "aircraft_seat_id": "b00d6549-a329-4718-81c0-b759b3e4ac29",
                "aircraft_id": "8bf696ca-b0fc-4466-8fee-97f0bfcd0z81",
                "aircraft_seat_position": "19A"
            },
            {
                "aircraft_seat_id": "2ad885e7-1ae5-4e20-9367-11514a7071ed",
                "aircraft_id": "8bf696ca-b0fc-4466-8fee-97f0bfcd0z81",
                "aircraft_seat_position": "19B"
            },
            {
                "aircraft_seat_id": "e0c685fd-999b-4b35-ba99-27e071c901bf",
                "aircraft_id": "8bf696ca-b0fc-4466-8fee-97f0bfcd0z81",
                "aircraft_seat_position": "19C"
            },
            {
                "aircraft_seat_id": "7972e17b-ef0e-46ff-b9c3-a21cd33e7387",
                "aircraft_id": "8bf696ca-b0fc-4466-8fee-97f0bfcd0z81",
                "aircraft_seat_position": "19D"
            },
            {
                "aircraft_seat_id": "378c8878-ad68-4034-9504-fbd34ca4d785",
                "aircraft_id": "8bf696ca-b0fc-4466-8fee-97f0bfcd0z81",
                "aircraft_seat_position": "19E"
            },
            {
                "aircraft_seat_id": "b28ac149-1b5b-4e99-ab91-62b91b6ef3aa",
                "aircraft_id": "8bf696ca-b0fc-4466-8fee-97f0bfcd0z81",
                "aircraft_seat_position": "19F"
            },
            {
                "aircraft_seat_id": "6de6340d-946e-4379-a2b5-f282086a2452",
                "aircraft_id": "8bf696ca-b0fc-4466-8fee-97f0bfcd0z81",
                "aircraft_seat_position": "20A"
            },
            {
                "aircraft_seat_id": "10c7c7ff-b7c3-4f7a-9e97-444e15ba070c",
                "aircraft_id": "8bf696ca-b0fc-4466-8fee-97f0bfcd0z81",
                "aircraft_seat_position": "20B"
            },
            {
                "aircraft_seat_id": "9dbc5cea-16a3-46ad-9bb2-b08af3980dd5",
                "aircraft_id": "8bf696ca-b0fc-4466-8fee-97f0bfcd0z81",
                "aircraft_seat_position": "20C"
            },
            {
                "aircraft_seat_id": "59d99850-9e11-49c8-bf3e-418f1e76ffd1",
                "aircraft_id": "8bf696ca-b0fc-4466-8fee-97f0bfcd0z81",
                "aircraft_seat_position": "20D"
            },
            {
                "aircraft_seat_id": "8d54e160-07de-4f27-957b-5e7a7d239fd3",
                "aircraft_id": "8bf696ca-b0fc-4466-8fee-97f0bfcd0z81",
                "aircraft_seat_position": "20E"
            },
            {
                "aircraft_seat_id": "4c8f4ec6-febe-4497-8d0b-3724fa60ef78",
                "aircraft_id": "8bf696ca-b0fc-4466-8fee-97f0bfcd0z81",
                "aircraft_seat_position": "20F"
            },
            {
                "aircraft_seat_id": "a701cde9-2bde-41cd-a52a-cbf6dc33f57a",
                "aircraft_id": "8bf696ca-b0fc-4466-8fee-97f0bfcd0z81",
                "aircraft_seat_position": "21A"
            },
            {
                "aircraft_seat_id": "a1009cc4-d75a-498e-9535-b8ec186d5bfd",
                "aircraft_id": "8bf696ca-b0fc-4466-8fee-97f0bfcd0z81",
                "aircraft_seat_position": "21B"
            },
            {
                "aircraft_seat_id": "fa8bc98f-10fb-46b6-b95f-e8db34bed56a",
                "aircraft_id": "8bf696ca-b0fc-4466-8fee-97f0bfcd0z81",
                "aircraft_seat_position": "21C"
            },
            {
                "aircraft_seat_id": "1f9a70f6-34bb-4c96-9bf7-1b1afb1fdab4",
                "aircraft_id": "8bf696ca-b0fc-4466-8fee-97f0bfcd0z81",
                "aircraft_seat_position": "21D"
            },
            {
                "aircraft_seat_id": "75715018-7ec0-4ffa-8d4b-69e0686673c1",
                "aircraft_id": "8bf696ca-b0fc-4466-8fee-97f0bfcd0z81",
                "aircraft_seat_position": "21E"
            },
            {
                "aircraft_seat_id": "315afa90-d1df-4f8f-9407-b5462b39a23f",
                "aircraft_id": "8bf696ca-b0fc-4466-8fee-97f0bfcd0z81",
                "aircraft_seat_position": "21F"
            },
            {
                "aircraft_seat_id": "d56d28d6-3df4-460f-89df-a39506104bbd",
                "aircraft_id": "8bf696ca-b0fc-4466-8fee-97f0bfcd0z81",
                "aircraft_seat_position": "22A"
            },
            {
                "aircraft_seat_id": "e19aaa52-8d5a-4ef3-a5d1-0a2dc99c8b27",
                "aircraft_id": "8bf696ca-b0fc-4466-8fee-97f0bfcd0z81",
                "aircraft_seat_position": "22B"
            },
            {
                "aircraft_seat_id": "0178e5ae-86d5-46e2-90f2-7aafbb84556c",
                "aircraft_id": "8bf696ca-b0fc-4466-8fee-97f0bfcd0z81",
                "aircraft_seat_position": "22C"
            },
            {
                "aircraft_seat_id": "37f436e7-9da8-48d4-bfa4-b6c67f52b983",
                "aircraft_id": "8bf696ca-b0fc-4466-8fee-97f0bfcd0z81",
                "aircraft_seat_position": "22D"
            },
            {
                "aircraft_seat_id": "9fd919ec-bd00-49a4-a16c-216c24f08fac",
                "aircraft_id": "8bf696ca-b0fc-4466-8fee-97f0bfcd0z81",
                "aircraft_seat_position": "22E"
            },
            {
                "aircraft_seat_id": "2b3fd0f0-5a13-4cc8-9257-f3ffaf23927d",
                "aircraft_id": "8bf696ca-b0fc-4466-8fee-97f0bfcd0z81",
                "aircraft_seat_position": "22F"
            },
            {
                "aircraft_seat_id": "c83f1296-c125-460e-b30d-b7d8d4b3d6d5",
                "aircraft_id": "8bf696ca-b0fc-4466-8fee-97f0bfcd0z81",
                "aircraft_seat_position": "23A"
            },
            {
                "aircraft_seat_id": "2f66219c-5dda-4ae1-995e-03d0a524e1d5",
                "aircraft_id": "8bf696ca-b0fc-4466-8fee-97f0bfcd0z81",
                "aircraft_seat_position": "23B"
            },
            {
                "aircraft_seat_id": "0890186e-e100-405b-a9ad-8c0407db6d3d",
                "aircraft_id": "8bf696ca-b0fc-4466-8fee-97f0bfcd0z81",
                "aircraft_seat_position": "23C"
            },
            {
                "aircraft_seat_id": "4a2b3c41-eca5-4bfd-a337-c973031afc22",
                "aircraft_id": "8bf696ca-b0fc-4466-8fee-97f0bfcd0z81",
                "aircraft_seat_position": "23D"
            },
            {
                "aircraft_seat_id": "63574c8a-e289-4502-8322-41e21f3b1746",
                "aircraft_id": "8bf696ca-b0fc-4466-8fee-97f0bfcd0z81",
                "aircraft_seat_position": "23E"
            },
            {
                "aircraft_seat_id": "80466c99-c356-4914-9a68-5a59d73344e1",
                "aircraft_id": "8bf696ca-b0fc-4466-8fee-97f0bfcd0z81",
                "aircraft_seat_position": "23F"
            },
            {
                "aircraft_seat_id": "f03b806b-129f-409f-af48-7af9a4e8dc1f",
                "aircraft_id": "8bf696ca-b0fc-4466-8fee-97f0bfcd0z81",
                "aircraft_seat_position": "24A"
            },
            {
                "aircraft_seat_id": "347e57fd-a14c-4e9f-b299-854394b0618e",
                "aircraft_id": "8bf696ca-b0fc-4466-8fee-97f0bfcd0z81",
                "aircraft_seat_position": "24B"
            },
            {
                "aircraft_seat_id": "d0e4fdfb-7944-4159-8f07-0309cef41430",
                "aircraft_id": "8bf696ca-b0fc-4466-8fee-97f0bfcd0z81",
                "aircraft_seat_position": "24C"
            },
            {
                "aircraft_seat_id": "af87813a-305a-4306-bc62-f2da52d4e87f",
                "aircraft_id": "8bf696ca-b0fc-4466-8fee-97f0bfcd0z81",
                "aircraft_seat_position": "24D"
            },
            {
                "aircraft_seat_id": "2dcfbcc7-f185-433e-827f-cf3e3ecac035",
                "aircraft_id": "8bf696ca-b0fc-4466-8fee-97f0bfcd0z81",
                "aircraft_seat_position": "24E"
            },
            {
                "aircraft_seat_id": "8d187126-769c-45aa-b64b-f38d2427c36e",
                "aircraft_id": "8bf696ca-b0fc-4466-8fee-97f0bfcd0z81",
                "aircraft_seat_position": "24F"
            },
            {
                "aircraft_seat_id": "babe99cf-6aac-4b9e-af1f-12a511ecb12f",
                "aircraft_id": "8bf696ca-b0fc-4466-8fee-97f0bfcd0z81",
                "aircraft_seat_position": "25A"
            },
            {
                "aircraft_seat_id": "49a68b9a-294e-455b-bc88-9834c62ee3de",
                "aircraft_id": "8bf696ca-b0fc-4466-8fee-97f0bfcd0z81",
                "aircraft_seat_position": "25B"
            },
            {
                "aircraft_seat_id": "62a7e104-f1fa-423b-840d-c49f25ec90e9",
                "aircraft_id": "8bf696ca-b0fc-4466-8fee-97f0bfcd0z81",
                "aircraft_seat_position": "25C"
            },
            {
                "aircraft_seat_id": "e7ebab73-df72-4306-948c-0969f99351d8",
                "aircraft_id": "8bf696ca-b0fc-4466-8fee-97f0bfcd0z81",
                "aircraft_seat_position": "25D"
            },
            {
                "aircraft_seat_id": "7aac8921-61c0-491e-aff3-9cf45dff53f2",
                "aircraft_id": "8bf696ca-b0fc-4466-8fee-97f0bfcd0z81",
                "aircraft_seat_position": "25E"
            },
            {
                "aircraft_seat_id": "03be990f-8386-443d-8e7c-e3be7794c47d",
                "aircraft_id": "8bf696ca-b0fc-4466-8fee-97f0bfcd0z81",
                "aircraft_seat_position": "25F"
            },
            {
                "aircraft_seat_id": "015d58d7-c1b2-474a-aa64-380bdda21a3d",
                "aircraft_id": "8bf696ca-b0fc-4466-8fee-97f0bfcd0z81",
                "aircraft_seat_position": "26A"
            },
            {
                "aircraft_seat_id": "3da11570-3caa-4497-9e45-0bf24844c98d",
                "aircraft_id": "8bf696ca-b0fc-4466-8fee-97f0bfcd0z81",
                "aircraft_seat_position": "26B"
            },
            {
                "aircraft_seat_id": "7389d149-70ad-4417-acc0-53007421aebf",
                "aircraft_id": "8bf696ca-b0fc-4466-8fee-97f0bfcd0z81",
                "aircraft_seat_position": "26C"
            },
            {
                "aircraft_seat_id": "6ebf49ba-c337-45c1-a0dc-5f66771029c0",
                "aircraft_id": "8bf696ca-b0fc-4466-8fee-97f0bfcd0z81",
                "aircraft_seat_position": "26D"
            },
            {
                "aircraft_seat_id": "e873f2d2-02ef-42c1-bf36-86ebeed6514e",
                "aircraft_id": "8bf696ca-b0fc-4466-8fee-97f0bfcd0z81",
                "aircraft_seat_position": "26E"
            },
            {
                "aircraft_seat_id": "0e13a385-4551-43b6-ade8-ab71991365c5",
                "aircraft_id": "8bf696ca-b0fc-4466-8fee-97f0bfcd0z81",
                "aircraft_seat_position": "26F"
            },
            {
                "aircraft_seat_id": "cef0f290-6516-41aa-afb5-afb7505fe1f0",
                "aircraft_id": "8bf696ca-b0fc-4466-8fee-97f0bfcd0z81",
                "aircraft_seat_position": "27A"
            },
            {
                "aircraft_seat_id": "ecea4f71-94b3-4a73-af30-9ad1a591cba1",
                "aircraft_id": "8bf696ca-b0fc-4466-8fee-97f0bfcd0z81",
                "aircraft_seat_position": "27B"
            },
            {
                "aircraft_seat_id": "59f4ec1f-0c2c-4b69-87e5-58c3eebef7a9",
                "aircraft_id": "8bf696ca-b0fc-4466-8fee-97f0bfcd0z81",
                "aircraft_seat_position": "27C"
            },
            {
                "aircraft_seat_id": "698a5d27-ce2e-4f9d-8787-9389f4250d60",
                "aircraft_id": "8bf696ca-b0fc-4466-8fee-97f0bfcd0z81",
                "aircraft_seat_position": "27D"
            },
            {
                "aircraft_seat_id": "537b95d8-a123-44b3-a0a5-1de5416d652b",
                "aircraft_id": "8bf696ca-b0fc-4466-8fee-97f0bfcd0z81",
                "aircraft_seat_position": "27E"
            },
            {
                "aircraft_seat_id": "5c118e6a-2a96-4cba-bace-467f87359a67",
                "aircraft_id": "8bf696ca-b0fc-4466-8fee-97f0bfcd0z81",
                "aircraft_seat_position": "27F"
            },
            {
                "aircraft_seat_id": "0c2758b8-0e68-4b8a-95ee-cf22153bda80",
                "aircraft_id": "8bf696ca-b0fc-4466-8fee-97f0bfcd0z81",
                "aircraft_seat_position": "28A"
            },
            {
                "aircraft_seat_id": "21856409-e2ab-44b5-84bb-97b980ba3a25",
                "aircraft_id": "8bf696ca-b0fc-4466-8fee-97f0bfcd0z81",
                "aircraft_seat_position": "28B"
            },
            {
                "aircraft_seat_id": "bd4649c7-dae0-4b1d-be5b-665263075ebd",
                "aircraft_id": "8bf696ca-b0fc-4466-8fee-97f0bfcd0z81",
                "aircraft_seat_position": "28C"
            },
            {
                "aircraft_seat_id": "1eda42ae-a271-4964-a673-fa79906a49e0",
                "aircraft_id": "8bf696ca-b0fc-4466-8fee-97f0bfcd0z81",
                "aircraft_seat_position": "28D"
            },
            {
                "aircraft_seat_id": "4194758d-0d9f-46d4-98b0-7cc9a3942698",
                "aircraft_id": "8bf696ca-b0fc-4466-8fee-97f0bfcd0z81",
                "aircraft_seat_position": "28E"
            },
            {
                "aircraft_seat_id": "29e845c7-6cbe-4f07-9819-a5d7fec42628",
                "aircraft_id": "8bf696ca-b0fc-4466-8fee-97f0bfcd0z81",
                "aircraft_seat_position": "28F"
            },
            {
                "aircraft_seat_id": "55d92e69-6a48-4478-8662-df281acbc18d",
                "aircraft_id": "8bf696ca-b0fc-4466-8fee-97f0bfcd0z81",
                "aircraft_seat_position": "29A"
            },
            {
                "aircraft_seat_id": "f9e40084-1538-449a-9711-fb5d1730de15",
                "aircraft_id": "8bf696ca-b0fc-4466-8fee-97f0bfcd0z81",
                "aircraft_seat_position": "29B"
            },
            {
                "aircraft_seat_id": "c142568e-cc1a-4b22-bafe-e76a4ae2a25e",
                "aircraft_id": "8bf696ca-b0fc-4466-8fee-97f0bfcd0z81",
                "aircraft_seat_position": "29C"
            },
            {
                "aircraft_seat_id": "e3f3c889-e97d-4223-93d1-dc5f3ec93463",
                "aircraft_id": "8bf696ca-b0fc-4466-8fee-97f0bfcd0z81",
                "aircraft_seat_position": "29D"
            },
            {
                "aircraft_seat_id": "2892f1e2-82ba-4729-9f50-0825942b6160",
                "aircraft_id": "8bf696ca-b0fc-4466-8fee-97f0bfcd0z81",
                "aircraft_seat_position": "29E"
            },
            {
                "aircraft_seat_id": "b7fcf8c9-10fe-4e22-992f-575fbeb1588c",
                "aircraft_id": "8bf696ca-b0fc-4466-8fee-97f0bfcd0z81",
                "aircraft_seat_position": "29F"
            },
            {
                "aircraft_seat_id": "95f67d35-864d-43ed-aa4f-e581d8cfa635",
                "aircraft_id": "8bf696ca-b0fc-4466-8fee-97f0bfcd0z81",
                "aircraft_seat_position": "30A"
            },
            {
                "aircraft_seat_id": "c2c42896-f7c0-4bc9-bcea-2758a95c1f3c",
                "aircraft_id": "8bf696ca-b0fc-4466-8fee-97f0bfcd0z81",
                "aircraft_seat_position": "30B"
            },
            {
                "aircraft_seat_id": "5baea643-c272-4567-81b1-83a9c952db7a",
                "aircraft_id": "8bf696ca-b0fc-4466-8fee-97f0bfcd0z81",
                "aircraft_seat_position": "30C"
            },
            {
                "aircraft_seat_id": "7ae8d654-2b72-4306-8159-9782c231b52c",
                "aircraft_id": "8bf696ca-b0fc-4466-8fee-97f0bfcd0z81",
                "aircraft_seat_position": "30D"
            },
            {
                "aircraft_seat_id": "e1bf17bd-2b36-40a2-bf04-f1e2854a4683",
                "aircraft_id": "8bf696ca-b0fc-4466-8fee-97f0bfcd0z81",
                "aircraft_seat_position": "30E"
            },
            {
                "aircraft_seat_id": "22acc906-b4a8-47d9-b800-f6fe4bad2a98",
                "aircraft_id": "8bf696ca-b0fc-4466-8fee-97f0bfcd0z81",
                "aircraft_seat_position": "30F"
            }
        ]
    })

    console.log('Seeding completed for aircraft_seats table!');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });