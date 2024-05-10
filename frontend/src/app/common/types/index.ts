/**
 {
  "statusCode": 200,
  "message": "OK",
  "data": {
    "items": [
      {
        "id": 1,
        "userId": 8,
        "title": "Vinculum viduo absens quam.",
        "content": "Torqueo qui color dolorem carbo clam aeternus suasoria. Adduco patior aliqua patrocinor concido depopulo. Perspiciatis asperiores thalassinus defluo bos tantillus.\nAdstringo carpo confido. Deinde ab cado. Voluptatem ipsam vilis benevolentia adamo tenus utrum.\nUltio reiciendis tabula cariosus acquiro vacuus. Patria sono via viridis subnecto vulgo spiculum. Perspiciatis delego voco tamquam supellex comes adicio defessus.",
        "createdAt": "2024-05-07T09:10:40.182Z",
        "updatedAt": "2024-05-07T09:10:40.182Z",
        "user": {
          "id": 8,
          "username": "updated_username",
          "fullName": "test user for testing",
          "email": "test-user-for-testing@test.com",
          "isPasswordReset": false,
          "signature": null,
          "isActive": true,
          "role": "social",
          "preferredLanguage": "en",
          "createdAt": "2024-05-07T02:29:02.929Z",
          "updatedAt": "2024-05-07T02:29:02.929Z",
          "deletedAt": null,
          "phone": "123456789"
        }
      },
      {
        "id": 2,
        "userId": 8,
        "title": "Delibero dignissimos canis.",
        "content": "Cognomen canonicus acidus tamquam sit aegre depono thorax calamitas pel. Adsidue arbor usitas cogito volo terror conatus vilicus cruciamentum soluta. Molestias ascit curis sonitus aut deputo.\nSuccedo conservo trado desipio umerus. Tyrannus speciosus ter curia. Sustineo abbas cibo nemo desino tracto aqua claustrum capillus.\nVorago thymbra decipio ars tempora nobis agnitio. Capitulus adamo ater adsidue avaritia velut. Universe sonitus angustus.",
        "createdAt": "2024-05-07T09:10:55.150Z",
        "updatedAt": "2024-05-07T09:10:55.150Z",
        "user": {
          "id": 8,
          "username": "updated_username",
          "fullName": "test user for testing",
          "email": "test-user-for-testing@test.com",
          "isPasswordReset": false,
          "signature": null,
          "isActive": true,
          "role": "social",
          "preferredLanguage": "en",
          "createdAt": "2024-05-07T02:29:02.929Z",
          "updatedAt": "2024-05-07T02:29:02.929Z",
          "deletedAt": null,
          "phone": "123456789"
        }
      },
      {
        "id": 3,
        "userId": 8,
        "title": "Communis suscipit earum claro trucido depopulo cornu suadeo.",
        "content": "Acies defero delinquo. Ulterius defungo patior caveo adipisci arcesso. Confero terra beneficium angulus acer cruentus neque ducimus necessitatibus.\nNihil caput abbas compono comis avaritia considero quis arcesso. Vulpes vomer deputo ullam solvo. Cena sulum solutio.\nSumma necessitatibus solus minus sortitus repellat labore amicitia. Error earum reprehenderit. Eius bos temperantia tumultus optio amita ullam audacia.",
        "createdAt": "2024-05-07T09:12:20.282Z",
        "updatedAt": "2024-05-07T09:12:20.282Z",
        "user": {
          "id": 8,
          "username": "updated_username",
          "fullName": "test user for testing",
          "email": "test-user-for-testing@test.com",
          "isPasswordReset": false,
          "signature": null,
          "isActive": true,
          "role": "social",
          "preferredLanguage": "en",
          "createdAt": "2024-05-07T02:29:02.929Z",
          "updatedAt": "2024-05-07T02:29:02.929Z",
          "deletedAt": null,
          "phone": "123456789"
        }
      },
      {
        "id": 4,
        "userId": 8,
        "title": "Tricesimus toties arguo verecundia molestiae cupiditate quae sponte verecundia arbustum.",
        "content": "Supellex tergo denique tepidus vapulus sodalitas pecco adstringo conspergo deficio. Tibi voluntarius demo amplitudo illo trado cariosus excepturi alioqui adfectus. Minus tersus debitis clarus torqueo vulnero theatrum.\nAvaritia temporibus tergeo repellendus cura coadunatio titulus deporto. Vehemens tum amaritudo quae supellex ventus socius qui pectus. Cubicularis undique pauci sit triduana subvenio tamdiu amicitia.\nDefero amplitudo avarus cognomen. Arceo varietas curiositas absque amiculum. Tantum corroboro cognatus summisse carus ceno cupressus speciosus amiculum.",
        "createdAt": "2024-05-07T09:12:46.437Z",
        "updatedAt": "2024-05-07T09:12:46.437Z",
        "user": {
          "id": 8,
          "username": "updated_username",
          "fullName": "test user for testing",
          "email": "test-user-for-testing@test.com",
          "isPasswordReset": false,
          "signature": null,
          "isActive": true,
          "role": "social",
          "preferredLanguage": "en",
          "createdAt": "2024-05-07T02:29:02.929Z",
          "updatedAt": "2024-05-07T02:29:02.929Z",
          "deletedAt": null,
          "phone": "123456789"
        }
      }
    ],
    "total": 250,
    "page": "1",
    "limit": "4"
  }
}
 */

type SuccessResponse = {
  statusCode: number;
  message: string;
  data: any;
};

type ErrorResponse = {
  statusCode: number;
  message: string;
  error: string;
};

export {
  SuccessResponse,
  ErrorResponse
}