const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  await prisma.recipe.createMany({
    data: [
      // Happy
      {
        title: "Fruit Smoothie",
        image: "https://source.unsplash.com/400x300/?smoothie",
        description: "A refreshing blend of fruits and yogurt.",
        moodType: "Happy",
        ingredients: "Banana, Berries, Yogurt, Honey, Ice",
        steps: "1. Add banana, berries, yogurt and honey to blender.\n2. Blend until smooth.\n3. Add ice and blend again. Serve chilled.",
      },
      {
        title: "Veggie Wrap",
        image: "https://source.unsplash.com/400x300/?wrap",
        description: "Wholesome wrap with fresh veggies and hummus.",
        moodType: "Happy",
        ingredients: "Whole wheat wrap, Lettuce, Cucumber, Tomato, Hummus",
        steps: "1. Spread hummus on wrap.\n2. Layer chopped veggies.\n3. Roll and serve fresh.",
      },
      {
        title: "Grilled Sandwich",
        image: "https://source.unsplash.com/400x300/?sandwich",
        description: "Toasted sandwich filled with veggies and cheese.",
        moodType: "Happy",
        ingredients: "Bread, Cheese, Tomato, Onion, Butter",
        steps: "1. Assemble sandwich with veggies and cheese.\n2. Butter outside and grill until golden.\n3. Slice and serve hot.",
      },

      // Neutral
      {
        title: "Rice & Dal",
        image: "https://source.unsplash.com/400x300/?dal",
        description: "A balanced Indian meal for any mood.",
        moodType: "Neutral",
        ingredients: "Rice, Moong Dal, Cumin, Turmeric, Ghee",
        steps: "1. Cook dal with turmeric and salt.\n2. Steam rice.\n3. Temper dal with ghee, cumin.\n4. Serve with rice.",
      },
      {
        title: "Chapati & Veg Curry",
        image: "https://source.unsplash.com/400x300/?chapati",
        description: "Simple roti served with mixed vegetable curry.",
        moodType: "Neutral",
        ingredients: "Wheat flour, Mixed Veggies, Tomato, Spices",
        steps: "1. Knead dough and make chapatis.\n2. Cook veggies in tomato-spice base.\n3. Serve hot.",
      },
      {
        title: "Mixed Salad",
        image: "https://source.unsplash.com/400x300/?salad",
        description: "Light and crunchy fresh salad.",
        moodType: "Neutral",
        ingredients: "Lettuce, Cucumber, Carrot, Lemon, Olive Oil",
        steps: "1. Chop all veggies.\n2. Mix with lemon juice and oil.\n3. Toss and serve fresh.",
      },

      // Sad
      {
        title: "Chocolate Cake",
        image: "https://source.unsplash.com/400x300/?chocolate",
        description: "Rich chocolate cake to boost your mood.",
        moodType: "Sad",
        ingredients: "Flour, Cocoa, Sugar, Eggs, Butter",
        steps: "1. Mix dry and wet ingredients.\n2. Pour in greased pan.\n3. Bake at 180°C for 30 mins.\n4. Cool and serve.",
      },
      {
        title: "Mac & Cheese",
        image: "https://source.unsplash.com/400x300/?macncheese",
        description: "Creamy and cheesy comfort food.",
        moodType: "Sad",
        ingredients: "Macaroni, Milk, Cheese, Butter, Flour",
        steps: "1. Boil macaroni.\n2. Make cheese sauce.\n3. Mix and serve hot.",
      },
      {
        title: "Ice Cream",
        image: "https://source.unsplash.com/400x300/?icecream",
        description: "Cold and sweet to lift spirits.",
        moodType: "Sad",
        ingredients: "Milk, Cream, Sugar, Vanilla",
        steps: "1. Mix all ingredients.\n2. Churn.\n3. Freeze and enjoy.",
      },

      // Angry
      {
        title: "Spicy Tacos",
        image: "https://source.unsplash.com/400x300/?tacos",
        description: "Crispy tacos filled with spicy fillings.",
        moodType: "Angry",
        ingredients: "Taco shells, Beans, Lettuce, Jalapeños, Salsa",
        steps: "1. Warm taco shells.\n2. Fill with spicy beans and veggies.\n3. Top with salsa.",
      },
      {
        title: "Chili Paneer",
        image: "https://source.unsplash.com/400x300/?paneer",
        description: "Hot Indo-Chinese paneer stir-fry.",
        moodType: "Angry",
        ingredients: "Paneer, Bell Peppers, Soy Sauce, Chili Sauce",
        steps: "1. Fry paneer cubes.\n2. Stir-fry with sauces.\n3. Serve with rice.",
      },
      {
        title: "Crunchy Nachos",
        image: "https://source.unsplash.com/400x300/?nachos",
        description: "Nachos loaded with spicy toppings.",
        moodType: "Angry",
        ingredients: "Tortilla Chips, Cheese, Jalapeños, Beans, Salsa",
        steps: "1. Layer chips and toppings.\n2. Bake till cheese melts.\n3. Serve.",
      },

      // Stressed
      {
        title: "Green Tea",
        image: "https://source.unsplash.com/400x300/?greentea",
        description: "Warm tea to calm your nerves.",
        moodType: "Stressed",
        ingredients: "Green tea, Water, Honey",
        steps: "1. Boil water.\n2. Steep green tea.\n3. Add honey.",
      },
      {
        title: "Banana Oats",
        image: "https://source.unsplash.com/400x300/?banana",
        description: "Simple oats with banana for stable energy.",
        moodType: "Stressed",
        ingredients: "Oats, Milk, Banana, Cinnamon",
        steps: "1. Cook oats in milk.\n2. Add banana and cinnamon.\n3. Serve warm.",
      },
      {
        title: "Nutty Granola",
        image: "https://source.unsplash.com/400x300/?granola",
        description: "Nut-packed granola for mindful snacking.",
        moodType: "Stressed",
        ingredients: "Oats, Honey, Nuts, Seeds, Coconut",
        steps: "1. Mix all ingredients.\n2. Bake until golden.\n3. Cool and store.",
      },

      // Other
      {
        title: "Comfort Food",
        image: "https://source.unsplash.com/400x300/?comfort",
        description: "Whatever makes you feel better.",
        moodType: "Other",
        ingredients: "Your favorite ingredients",
        steps: "1. Cook what you love.\n2. Enjoy with a smile.",
      },
      {
        title: "Your Favorite Dish",
        image: "https://source.unsplash.com/400x300/?favoritefood",
        description: "Made with love and comfort.",
        moodType: "Other",
        ingredients: "Anything familiar and tasty",
        steps: "1. Pick your dish.\n2. Prepare it your way.\n3. Relax and enjoy.",
      },
      {
        title: "Surprise Meal",
        image: "https://source.unsplash.com/400x300/?meal",
        description: "Try something totally new!",
        moodType: "Other",
        ingredients: "Chef’s choice",
        steps: "1. Try a random recipe.\n2. Cook and taste.\n3. Learn something new.",
      }
    ]
  });
  console.log("✅ Recipes seeded!");
}

main().catch(console.error).finally(() => prisma.$disconnect());
