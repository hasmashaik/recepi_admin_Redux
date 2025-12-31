import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Recipe } from './recipeTypes'

const initialState: Recipe[] = [
  // Hotel 1: Grand Plaza Hotel (7 recipes)
  {
    id: '1',
    name: 'Chicken Biryani',
    category: 'Non-Veg',
    price: 250,
    status: 'Active',
    description: 'Aromatic basmati rice cooked with tender chicken pieces and exotic spices',
    image: 'https://www.tasteatlas.com/images/dishes/1ccf2f147ecc467d8da6b54bd8b6089f.jpg?mw=1300',
    chef: 'Chef Ahmed',
    rating: 4.5,
    createdAt: '2023-01-15',
    hotelId: '1', // Grand Plaza Hotel
  },
  {
    id: '2',
    name: 'Grilled Salmon',
    category: 'Non-Veg',
    price: 350,
    status: 'Active',
    description: 'Fresh Atlantic salmon grilled to perfection with herbs',
    image: 'https://www.lecremedelacrumb.com/wp-content/uploads/2019/08/cajun-honey-butter-grilled-salmon-2.jpg',
    chef: 'Chef Robert',
    rating: 4.8,
    createdAt: '2023-03-10',
    hotelId: '1', // Grand Plaza Hotel
  },
  {
    id: '3',
    name: 'Thai Green Curry',
    category: 'Non-Veg',
    price: 280,
    status: 'Active',
    description: 'Spicy and aromatic Thai curry with coconut milk and vegetables',
    image: 'https://hot-thai-kitchen.com/wp-content/uploads/2022/09/vegan-green-curry-sq-1.jpg',
    chef: 'Chef Niran',
    rating: 4.6,
    createdAt: '2023-05-12',
    hotelId: '1', // Grand Plaza Hotel
  },
  {
    id: '4',
    name: 'Butter Chicken',
    category: 'Non-Veg',
    price: 300,
    status: 'Active',
    description: 'Creamy tomato-based curry with tender chicken pieces',
    image: 'https://sarahsvegankitchen.com/wp-content/uploads/2025/03/Butter-Tofu-3.jpg',
    chef: 'Chef Raj',
    rating: 4.7,
    createdAt: '2023-06-20',
    hotelId: '1', // Grand Plaza Hotel
  },
  {
    id: '5',
    name: 'Paneer Tikka Masala',
    category: 'Veg',
    price: 220,
    status: 'Active',
    description: 'Grilled cottage cheese cubes in rich tomato gravy',
    image: 'https://sukhis.com/app/uploads/2013/02/Sukhis-Paneer-Tikka-Masala.jpg',
    chef: 'Chef Priya',
    rating: 4.4,
    createdAt: '2023-07-05',
    hotelId: '1', // Grand Plaza Hotel
  },
  {
    id: '6',
    name: 'Naan Bread',
    category: 'Bread',
    price: 80,
    status: 'Active',
    description: 'Soft leavened flatbread cooked in tandoor',
    image: 'https://fullofplants.com/wp-content/uploads/2023/05/Homemade-Naan-Bread-Restaurant-Style-Vegan-16.jpg',
    chef: 'Chef Singh',
    rating: 4.3,
    createdAt: '2023-08-10',
    hotelId: '1', // Grand Plaza Hotel
  },
  {
    id: '7',
    name: 'Gulab Jamun',
    category: 'Dessert',
    price: 150,
    status: 'Active',
    description: 'Deep-fried milk solids in sugar syrup',
    image: 'https://i0.wp.com/www.chitrasfoodbook.com/wp-content/uploads/2016/10/gulab-jamun-using-mix.jpg?w=1200&ssl=1',
    chef: 'Chef Meera',
    rating: 4.8,
    createdAt: '2023-09-15',
    hotelId: '1', // Grand Plaza Hotel
  },

  // Hotel 2: Sunset Resort (6 recipes)
  {
    id: '8',
    name: 'Vegetable Pasta',
    category: 'Veg',
    price: 180,
    status: 'Active',
    description: 'Creamy pasta with fresh seasonal vegetables',
    image: 'https://skinnyspatula.com/wp-content/uploads/2022/06/One_Pot_Veggie_Pasta_1.jpg',
    chef: 'Chef Maria',
    rating: 4.2,
    createdAt: '2023-02-20',
    hotelId: '2', // Sunset Resort
  },
  {
    id: '9',
    name: 'Goan Fish Curry',
    category: 'Non-Veg',
    price: 300,
    status: 'Active',
    description: 'Traditional Goan fish curry with coconut and spices',
    image: 'https://satyamskitchen.com/wp-content/uploads/2021/05/website.jpg',
    chef: 'Chef Sunita',
    rating: 4.7,
    createdAt: '2023-06-18',
    hotelId: '2', // Sunset Resort
  },
  {
    id: '10',
    name: 'Seafood Platter',
    category: 'Non-Veg',
    price: 450,
    status: 'Active',
    description: 'Assorted seafood including prawns, squid, and fish',
    image: 'https://www.recipetineats.com/uploads/2023/12/Seafood-Platter_Sony-5.jpg',
    chef: 'Chef Fernandes',
    rating: 4.5,
    createdAt: '2023-04-10',
    hotelId: '2', // Sunset Resort
  },
  {
    id: '11',
    name: 'Coconut Rice',
    category: 'Rice',
    price: 120,
    status: 'Active',
    description: 'Fragrant rice cooked with coconut milk',
    image: 'https://mariasmenu.com/wp-content/uploads/Coconut-Rice-1-500x500.png',
    chef: 'Chef Lakshmi',
    rating: 4.3,
    createdAt: '2023-05-25',
    hotelId: '2', // Sunset Resort
  },
  {
    id: '12',
    name: 'Prawn Balchao',
    category: 'Non-Veg',
    price: 320,
    status: 'Active',
    description: 'Spicy Goan prawn pickle-style dish',
    image: 'https://deliciousmemorieswithalves.wordpress.com/wp-content/uploads/2021/07/balchao-prawn.jpg',
    chef: 'Chef Almeida',
    rating: 4.6,
    createdAt: '2023-07-30',
    hotelId: '2', // Sunset Resort
  },
  {
    id: '13',
    name: 'Bebinca',
    category: 'Dessert',
    price: 180,
    status: 'Active',
    description: 'Traditional Goan layered pudding',
    image: 'https://ychef.files.bbci.co.uk/1280x720/p0gjfcls.jpg',
    chef: 'Chef D\'Souza',
    rating: 4.8,
    createdAt: '2023-08-12',
    hotelId: '2', // Sunset Resort
  },

  // Hotel 3: Heritage Inn (7 recipes)
  {
    id: '14',
    name: 'Mushroom Risotto',
    category: 'Veg',
    price: 220,
    status: 'Active',
    description: 'Creamy Italian rice dish with wild mushrooms and parmesan',
    image: 'https://cookingmydreams.com/wp-content/uploads/2025/02/Mushroom-Risotto-4.jpg',
    chef: 'Chef Giovanni',
    rating: 4.3,
    createdAt: '2023-04-05',
    hotelId: '3', // Heritage Inn
  },
  {
    id: '15',
    name: 'Rajasthani Dal Baati',
    category: 'Veg',
    price: 200,
    status: 'Active',
    description: 'Traditional Rajasthani dish with lentils and baked wheat balls',
    image: 'https://www.ammakithaali.com/wp-content/uploads/2022/07/dalbtichrma-1068x601.jpg',
    chef: 'Chef Rajesh',
    rating: 4.4,
    createdAt: '2023-07-22',
    hotelId: '3', // Heritage Inn
  },
  {
    id: '16',
    name: 'Laal Maas',
    category: 'Non-Veg',
    price: 350,
    status: 'Active',
    description: 'Spicy Rajasthani mutton curry',
    image: 'https://media-cdn.tripadvisor.com/media/photo-s/19/58/55/0b/laal-maas-is-a-fiery.jpg',
    chef: 'Chef Bhanwar',
    rating: 4.7,
    createdAt: '2023-03-15',
    hotelId: '3', // Heritage Inn
  },
  {
    id: '17',
    name: 'Gatte Ki Sabzi',
    category: 'Veg',
    price: 180,
    status: 'Active',
    description: 'Gram flour dumplings in spicy gravy',
    image: 'https://carveyourcraving.com/wp-content/uploads/2021/09/gatte-ki-sabji.jpg',
    chef: 'Chef Meena',
    rating: 4.5,
    createdAt: '2023-05-20',
    hotelId: '3', // Heritage Inn
  },
  {
    id: '18',
    name: 'Bajra Roti',
    category: 'Bread',
    price: 60,
    status: 'Active',
    description: 'Traditional millet bread from Rajasthan',
    image: 'https://www.nehascookbook.com/wp-content/uploads/2022/09/Dahi-tikhri-bajra-rotli-WS-1-1-500x375.jpg',
    chef: 'Chef Devi',
    rating: 4.2,
    createdAt: '2023-06-25',
    hotelId: '3', // Heritage Inn
  },
  {
    id: '19',
    name: 'Ker Sangri',
    category: 'Veg',
    price: 160,
    status: 'Active',
    description: 'Traditional Rajasthani desert beans and berries',
    image: 'https://i.pinimg.com/564x/a9/4d/1f/a94d1f112150456f7d3e1572284171ab.jpg',
    chef: 'Chef Kesar',
    rating: 4.4,
    createdAt: '2023-08-05',
    hotelId: '3', // Heritage Inn
  },
  {
    id: '20',
    name: 'Ghevar',
    category: 'Dessert',
    price: 200,
    status: 'Active',
    description: 'Traditional Rajasthani sweet disc-shaped cake',
    image: 'https://aayanshkitchen.com/wp-content/uploads/2025/08/Ghevar-1536x864.jpg',
    chef: 'Chef Bhavna',
    rating: 4.8,
    createdAt: '2023-09-10',
    hotelId: '3', // Heritage Inn
  },

  // Hotel 4: Mountain View Lodge (5 recipes)
  {
    id: '21',
    name: 'Himachali Dham',
    category: 'Veg',
    price: 250,
    status: 'Active',
    description: 'Traditional Himachali festive meal',
    image: 'https://www.hindustantimes.com/ht-img/img/2023/04/01/1600x900/A-Himachali--dham---a-traditional-multi-course-mea_1680364946544.jpg',
    chef: 'Chef Sharma',
    rating: 4.6,
    createdAt: '2023-04-25',
    hotelId: '4', // Mountain View Lodge
  },
  {
    id: '22',
    name: 'Sidu',
    category: 'Bread',
    price: 90,
    status: 'Active',
    description: 'Himachali steamed bread stuffed with walnuts',
    image: 'https://i.pinimg.com/736x/8b/90/3a/8b903a5d7320f35248480e7a17559bf3.jpg',
    chef: 'Chef Thakur',
    rating: 4.4,
    createdAt: '2023-06-15',
    hotelId: '4', // Mountain View Lodge
  },
  {
    id: '23',
    name: 'Chana Madra',
    category: 'Veg',
    price: 180,
    status: 'Active',
    description: 'Chickpeas in yogurt-based gravy',
    image: 'https://s3-ap-south-1.amazonaws.com/betterbutterbucket-silver/joos-foodhealth15185997005a83fe13c3c69.jpeg',
    chef: 'Chef Rani',
    rating: 4.5,
    createdAt: '2023-07-20',
    hotelId: '4', // Mountain View Lodge
  },
  {
    id: '24',
    name: 'Babru',
    category: 'Snack',
    price: 120,
    status: 'Active',
    description: 'Himachali stuffed black gram flatbread',
    image: 'https://c.ndtvimg.com/2023-05/8fkuk11o_poori_625x300_25_May_23.jpg?im=FaceCrop,algorithm=dnn,width=384,height=384',
    chef: 'Chef Negi',
    rating: 4.3,
    createdAt: '2023-08-22',
    hotelId: '4', // Mountain View Lodge
  },
  {
    id: '25',
    name: 'Aktori',
    category: 'Snack',
    price: 140,
    status: 'Active',
    description: 'Himachali buckwheat leaf pancakes',
    image: 'https://rakkh.com/patrika/wp-content/uploads/2022/03/Malpua-Pallavi-Jayaraman-2048x1638.jpg',
    chef: 'Chef Verma',
    rating: 4.2,
    createdAt: '2023-09-18',
    hotelId: '4', // Mountain View Lodge
  },

  // Hotel 5: City Center Hotel (6 recipes)
  {
    id: '26',
    name: 'Bisi Bele Bath',
    category: 'Rice',
    price: 160,
    status: 'Active',
    description: 'Traditional Karnataka rice dish with lentils',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/Bisi_Bele_Bath_%28Bisibelebath%29.JPG/500px-Bisi_Bele_Bath_%28Bisibelebath%29.JPG',
    chef: 'Chef Gowda',
    rating: 4.5,
    createdAt: '2023-05-10',
    hotelId: '5', // City Center Hotel
  },
  {
    id: '27',
    name: 'Mysore Masala Dosa',
    category: 'Breakfast',
    price: 120,
    status: 'Active',
    description: 'Crispy crepe with spicy potato filling',
    image: 'https://i.pinimg.com/736x/2a/c1/51/2ac15169850a766390adcba3a6d28eef.jpg',
    chef: 'Chef Prakash',
    rating: 4.7,
    createdAt: '2023-06-05',
    hotelId: '5', // City Center Hotel
  },
  {
    id: '28',
    name: 'Mangalorean Fish Curry',
    category: 'Non-Veg',
    price: 280,
    status: 'Active',
    description: 'Spicy coconut-based fish curry from coastal Karnataka',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRk2cZHZyTmrZxqriWA6-4VoDnsIKQxE1XH9A&s',
    chef: 'Chef Shetty',
    rating: 4.6,
    createdAt: '2023-07-12',
    hotelId: '5', // City Center Hotel
  },
  {
    id: '29',
    name: 'Ragi Mudde',
    category: 'Main Course',
    price: 100,
    status: 'Active',
    description: 'Healthy finger millet balls',
    image: 'https://www.indianhealthyrecipes.com/wp-content/uploads/2021/02/ragi-mudde-recipe.jpg',
    chef: 'Chef Reddy',
    rating: 4.3,
    createdAt: '2023-08-08',
    hotelId: '5', // City Center Hotel
  },
  {
    id: '30',
    name: 'Chiroti',
    category: 'Dessert',
    price: 150,
    status: 'Active',
    description: 'Flaky layered sweet from Karnataka',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/Chiroti.jpg/1200px-Chiroti.jpg',
    chef: 'Chef Lakshmi',
    rating: 4.8,
    createdAt: '2023-09-25',
    hotelId: '5', // City Center Hotel
  },
  {
    id: '31',
    name: 'Udupi Sambar',
    category: 'Curry',
    price: 110,
    status: 'Active',
    description: 'Traditional lentil soup from Udupi',
    image: 'https://i0.wp.com/www.chitrasfoodbook.com/wp-content/uploads/2015/05/udupi-hotel-sambar.jpg?w=1200&ssl=1',
    chef: 'Chef Bhat',
    rating: 4.4,
    createdAt: '2023-10-05',
    hotelId: '5', // City Center Hotel
  },
]

const recipeSlice = createSlice({
  name: 'recipes',
  initialState,
  reducers: {
    addRecipe: (state, action: PayloadAction<Recipe>) => {
      // Check if recipe already exists
      const existingIndex = state.findIndex(recipe => recipe.id === action.payload.id)
      if (existingIndex === -1) {
        state.push(action.payload)
      }
    },
    updateRecipe: (state, action: PayloadAction<Recipe>) => {
      const index = state.findIndex(recipe => recipe.id === action.payload.id)
      if (index !== -1) {
        state[index] = action.payload
      }
    },
    deleteRecipe: (state, action: PayloadAction<string>) => {
      return state.filter(recipe => recipe.id !== action.payload)
    },
    toggleRecipeStatus: (state, action: PayloadAction<string>) => {
      const recipe = state.find(recipe => recipe.id === action.payload)
      if (recipe) {
        recipe.status = recipe.status === 'Active' ? 'Inactive' : 'Active'
      }
    },
  },
})

export const { addRecipe, updateRecipe, deleteRecipe, toggleRecipeStatus } = recipeSlice.actions
export default recipeSlice.reducer