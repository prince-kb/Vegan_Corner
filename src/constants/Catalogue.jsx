const catalogue = [
    {
        id: "00000001",
        type: "milk",
        name: "Alt Co Oat Milk",
        seller: "Alt Co",
        stars: 4.5,
        tag: ["milk","premium"],
        details: {
            stock : 20,
            price: 159,
            price2: 259,
            weight: "1L",
            packaging: "Closed, Plastic Bottle",
            ingredients: "Oat Milk (Water, Oats), Rapeseed Oil, Calcium Carbonate, Calcium Phosphate, Salt, Vitamins (D2, Riboflavin, B12)",
            description: "Alt Co Oat Milk is a deliciously creamy alternative to dairy and soy milk. It's perfect for coffee, smoothies, and baking. It's also free from dairy, eggs, lactose, cholesterol, peanuts, and gluten. It's a great tasting, versatile, and non-dairy alternative for your favourite recipes. Enjoy Alt Co Oat Milk... for a healthy lifestyle",
            instructions: "Shake well before use. Keep refrigerated. Once opened, consume within 7 days. Do not freeze.",
            life: "7 days",

        },
        images: ["https://vegandukan.com/cdn/shop/products/minitetrafrontwithoutstrawpng_e1815c24-ea58-41b7-9f00-3c4f70aa6711.png?v=1712060206&width=493", "https://vegandukan.com/cdn/shop/files/5_b804b381-dae3-4fa0-bac2-eac4f54a6421.png?v=1714389295&width=493", "https://vegandukan.com/cdn/shop/files/22_5053c412-5d2a-4ad4-a0d5-1303a333f51f.png?v=1714389295&width=493", "https://vegandukan.com/cdn/shop/files/0_-_01_1.jpg?v=1714389295&width=1100", "https://vegandukan.com/cdn/shop/files/0_-_04.jpg?v=1714389295&width=1100",],
        ratings: 100,
        reviews: 13,
        rrlink: "https://vegancorner.vercel.app",
        related:["00000004","00000002","00000003"],
        priority:1,
        offer:true,
        others1:"",
        others2:[],
    },
    {
        id: "00000002",
        type: "milk",
        name: "Almond Breeze Milk",
        seller: "Almond Breeze",
        stars: 4.3,
        tag: ["milk","premium"],
        details: {
            stock : 20,
            price: 259,
            price2: 309,
            weight: "1L",
            packaging: "Closed, Plastic Bottle",
            ingredients: "Water, Sugar, Almonds (2%), Calcium Carbonate, Emulsifier (Sunflower Lecithin), Sea Salt, Stabiliser (Gellan Gum), Natural Flavouring, Vitamins (E, D2, B12)",
            description: "Almond Breeze is a delicious way to be good to yourself, Provides a source of calcium, Vitamin E, D2, B12, and is low in fat. It's also free from dairy, eggs, lactose, cholesterol, peanuts, and gluten. It's a great tasting, versatile, and non-dairy alternative for your favourite recipes. Enjoy Almond Breeze... for a healthy lifestyle",
            instructions: "Shake well before use. Keep refrigerated. Once opened, consume within 7 days. Do not freeze.",
            life: "7 days",
        },
        images: ["https://vegandukan.com/cdn/shop/files/vdc_august_2023_amy-069.png?v=1712519550&width=493", "https://vegandukan.com/cdn/shop/files/vdc_august_2023_amy-078.png?v=1712519559&width=1100", "https://vegandukan.com/cdn/shop/files/vdc_august_2023_amy-082.png?v=1712519570&width=1100", "https://vegandukan.com/cdn/shop/files/vdc_august_2023_amy-084.png?v=1712519579&width=1100"],
        ratings: 102,
        reviews: 14,
        rrlink: "https://vegancorner.vercel.app",
        related:["00000001","00000004","00000003"],
        priority:2,
        offer:false,
        others1:"",
        others2:[],
    },
    {
        id: "00000003",
        type: "milk",
        name: "Almond Breeze Barista Blend",
        seller: "Almond Breeze",
        stars: 4.1,
        tag: ["milk","premium"],
        details: {
            stock : 20,
            price: 189,
            price2: 259,
            weight: "500mL",
            packaging: "Closed, Plastic Bottle",
            ingredients: "Water, Sugar, Almonds (2%), Calcium Carbonate, Emulsifier (Sunflower Lecithin), Sea Salt, Stabiliser (Gellan Gum), Natural Flavouring, Vitamins (E, D2, B12)",
            description: "Almond Breeze Barista Blend is a deliciously creamy alternative to dairy and soy milk. It's perfect for coffee, smoothies, and baking. It's also free from dairy, eggs, lactose, cholesterol, peanuts, and gluten. It's a great tasting, versatile, and non-dairy alternative for your favourite recipes. Enjoy Almond Breeze... for a healthy lifestyle",
            instructions: "Shake well before use. Keep refrigerated. Once opened, consume within 7 days. Do not freeze.",
            life: "7 days",
        },
        images: ["https://vegandukan.com/cdn/shop/files/33.png?v=1714388165&width=493", "https://vegandukan.com/cdn/shop/files/5_b804b381-dae3-4fa0-bac2-eac4f54a6421.png?v=1714389295&width=493", "https://vegandukan.com/cdn/shop/files/22_5053c412-5d2a-4ad4-a0d5-1303a333f51f.png?v=1714389295&width=493", "https://vegandukan.com/cdn/shop/files/0_-_01_1.jpg?v=1714389295&width=1100", "https://vegandukan.com/cdn/shop/files/0_-_04.jpg?v=1714389295&width=1100",],
        ratings: 170,
        reviews: 15,
        rrlink: "https://vegancorner.vercel.app",
        related:["00000001","00000002","00000004"],
        priority:1,
        offer:false,
        others1:"",
        others2:[],
    },
    {
        id: "00000004",
        type: "milk",
        name: "Unsweetened Almond Milk",
        seller: "Super Vegan Sales",
        stars: 4.5,
        tag: ["milk","premium"],
        details: {
            stock : 20,
            price: 199,
            price2: 249,
            weight: "1L",
            packaging: "Plastic Bottle, Recyclable",
            ingredients: "Water, Almonds (2%), Calcium Carbonate, Sea Salt, Emulsifier (Sunflower Lecithin), Stabiliser (Gellan Gum), Natural Flavouring, Vitamins (E, D2, B12)",
            description: "Unsweetened Almond Milk is a deliciously creamy alternative to dairy and soy milk. It's perfect for coffee, smoothies, and baking. It's also free from dairy, eggs, lactose, cholesterol, peanuts, and gluten. It's a great tasting, versatile, and non-dairy alternative for your favourite recipes. Enjoy Almond Breeze... for a healthy lifestyle",
            instructions: "Shake well before use. Keep refrigerated. Once opened, consume within 7 days. Do not freeze.",
            life: "15 days",
        },
        images: ["https://vegandukan.com/cdn/shop/products/71fixisxhis._sx679.jpg?v=1712060444&width=493", "https://vegandukan.com/cdn/shop/files/Nutrition.jpg?v=1712128995&width=493", "https://vegandukan.com/cdn/shop/products/71dwltblljs._sx679.jpg?v=1712128995&width=493", "https://vegandukan.com/cdn/shop/products/61p6lxz9mxs._sx679.jpg?v=1712128995&width=493", "https://vegandukan.com/cdn/shop/products/615xohxr1ps._sx679.jpg?v=1712128995&width=493"],
        ratings: 70,
        reviews: 5,
        rrlink: "https://vegancorner.vercel.app",
        related:["00000001","00000002","00000003"],
        priority:2,
        offer:false,
        others1:"",
        others2:[],
    },
    {
        id: "00000005",
        type: "snacks",
        name: "Bhuja Mix",
        seller: "Bhuja Corner",
        stars: 4.8,
        tag: ["snack"],
        details: {
            stock : 20,
            price: 99,
            price2: 179,
            weight: "200g",
            packaging: "Plastic Packet",
            ingredients: "Gram Flour, Vegetable Oil, Peanuts, Lentils, Sago, Rice Flakes, Salt, Sugar, Spices, Turmeric, Citric Acid",
            description: "Bhuja Mix is a deliciously spicy and tangy snack mix. It's perfect for tea time, parties, and picnics. It's also free from dairy, eggs, lactose, cholesterol, peanuts, and gluten. It's a great tasting, versatile, and non-dairy alternative for your favourite recipes. Enjoy Bhuja Mix... for a healthy lifestyle",
            instructions: "Store in a cool, dry place. Once opened, consume within 30 days. Do not freeze.",
            life: "30 days",
        },
        images: ["https://i.postimg.cc/fRHKhvN2/Designer.jpg", "https://i.postimg.cc/7Ldn5YbS/Designer.png", "https://i.postimg.cc/9frBXqXW/Designer-1.jpg", "https://i.postimg.cc/K8cNVHd3/Designer-2.jpg"],
        ratings: 80,
        reviews: 15,
        rrlink: "https://vegancorner.vercel.app",
        related:["00000006","00000007","00000008","00000009"],
        priority:1,
        offer:false,
        others1:"",
        others2:[],
    },
    {
        id: "00000006",
        type: "snacks",
        name: "Diet Mix",
        seller: "Diet Corner",
        stars: 4.5,
        tag: ["snack"],
        details: {
            stock : 20,
            price: 129,
            price2: 199,
            weight: "200g",
            packaging: "Plastic Packet",
            ingredients: "Gram Flour, Vegetable Oil, Peanuts, Lentils, Sago, Rice Flakes, Salt, Sugar, Spices, Turmeric, Citric Acid",
            description: "Diet Mix is a deliciously spicy and tangy snack mix. It's perfect for tea time, parties, and picnics. It's also free from dairy, eggs, lactose, cholesterol, peanuts, and gluten. It's a great tasting, versatile, and non-dairy alternative for your favourite recipes. Enjoy Diet Mix... for a healthy lifestyle",
            instructions: "Store in a cool, dry place. Once opened, consume within 30 days. Do not freeze.",
            life: "30 days",
        },
        images:["https://i.postimg.cc/mDYdLs2b/namkeen1-1.jpg","https://i.postimg.cc/RhvgqDNw/namkeen1-2.jpg","https://i.postimg.cc/NFbpXkHS/namkeen1-3.jpg","https://i.postimg.cc/dQ9Wgwx6/namkeen1-4.jpg"],
        ratings: 100,
        reviews: 6,
        rrlink: "https://vegancorner.vercel.app",
        related:["00000005","00000007","00000008","00000009"],
        priority:2,
        offer:false,
        others1:"",
        others2:[],
        
    },
    {
        id: "00000007",
        type: "snacks",
        name: "Spicy Mix",
        seller: "Vegan's Corner",
        stars: 4.8,
        tag: ["snack"],
        details: {
            stock : 20,
            price: 109,
            price2: 139,
            weight: "200g",
            packaging: "Paper Packet",
            ingredients: "Gram Flour, Vegetable Oil, Peanuts, Lentils, Sago, Rice Flakes, Salt, Sugar, Spices, Turmeric, Citric Acid",
            description: "Premium delight Mix is a deliciously spicy and tangy snack mix. It's perfect for tea time, parties, and picnics. It's also free from dairy, eggs, lactose, cholesterol, peanuts, and gluten. It's a great tasting, versatile, and non-dairy alternative for your favourite recipes. Enjoy Diet Mix... for a healthy lifestyle",
            instructions: "Store in a cool, dry place. Once opened, consume within 30 days. Do not freeze.",
            life: "30 days",
        },
        images:["https://i.postimg.cc/sX4cF4wx/namkeen2-1.jpg","https://i.postimg.cc/288HDgpD/namkeen2-2.jpg"],
        ratings: 109,
        reviews: 11,
        rrlink: "https://vegancorner.vercel.app",
        related:["00000006","00000005","00000008","00000009"],
        priority:0,
        offer:false,
        others1:"",
        others2:[],
    },
    {
        id: "00000008",
        type: "snacks",
        name: "Premium Delight Mix",
        seller: "Vegan's Corner",
        stars: 4.8,
        tag: ["snack"],
        details: {
            stock : 20,
            price: 119,
            price2: 149,
            weight: "200g",
            packaging: "Box Container",
            ingredients: "Gram Flour, Vegetable Oil, Peanuts, Lentils, Sago, Rice Flakes, Salt, Sugar, Spices, Turmeric, Citric Acid",
            description: "Premium delight Mix is a deliciously spicy and tangy snack mix. It's perfect for tea time, parties, and picnics. It's also free from dairy, eggs, lactose, cholesterol, peanuts, and gluten. It's a great tasting, versatile, and non-dairy alternative for your favourite recipes. Enjoy Diet Mix... for a healthy lifestyle",
            instructions: "Store in a cool, dry place. Once opened, consume within 30 days. Do not freeze.",
            life: "30 days",
        },
        images:["https://i.postimg.cc/NjKpyTfC/snackbox-1.png","https://i.postimg.cc/HsZ6s3H7/snackbox-2.png","https://i.postimg.cc/jjNccbfz/snackbox-3.png"],
        ratings: 100,
        reviews: 12,
        rrlink: "https://vegancorner.vercel.app",
        related:["00000006","00000007","00000005","00000009"],
        priority:1,
        offer:false,
        others1:"",
        others2:[],
    },
    {
        id: "00000009",
        type: "snacks",
        name: "Namkeen Mix",
        seller: "Vegan's Corner",
        stars: 4.8,
        tag: ["snack"],
        details: {
            stock : 20,
            price: 99,
            price2: 129,
            weight: "200g",
            packaging: "Reusable box Container",
            ingredients: "Gram Flour, Vegetable Oil, Peanuts, Lentils, Sago, Rice Flakes, Salt, Sugar, Spices, Turmeric, Citric Acid",
            description: "Namkeen Mix is a premium and deliciously spicy and tangy snack mix. It's perfect for tea time, parties, and picnics. It's also free from dairy, eggs, lactose, cholesterol, peanuts, and gluten. It's a great tasting, versatile, and non-dairy alternative for your favourite recipes. Enjoy Diet Mix... for a healthy lifestyle",
            instructions: "Store in a cool, dry place. Once opened, consume within 30 days. Do not freeze.",
            life: "30 days",
        },
        images:["https://i.postimg.cc/vZCX5B4Y/snackbox1-1.jpg","https://i.postimg.cc/2yjxCLKw/snackbox-4.png","https://i.postimg.cc/xC2RF4GB/snackbox1-2.jpg"],
        ratings: 100,
        reviews: 15,
        rrlink: "https://vegancorner.vercel.app",
        related:["00000006","00000007","00000008","00000005"],
        priority:0,
        offer:false,
        others1:"",
        others2:[],
        
    },
    {
        id: "00000010",
        type: "instant foods",
        name: "Quick Burger",
        seller: "Vegan's Corner",
        stars: 4.6,
        tag: ["instantfoods","burger"],
        details: {
            stock : 20,
            price: 99,
            price2: 129,
            weight: "200g",
            packaging: "Plastic Packet",
            ingredients: "Gram Flour, Vegetable Oil, Peanuts, Lentils, Sago, Rice Flakes, Salt, Sugar, Spices, Turmeric, Citric Acid",
            description: "Instant Burger is a pure vegan and extremely delicious burger. It's perfect for parties, and picnics. It's also free from dairy, eggs, lactose, cholesterol, peanuts, and gluten. It's a great tasting, versatile, and non-dairy alternative for your favourite recipes. Enjoy Diet Mix... for a healthy lifestyle",
            instructions: "Store in a cool, dry place. Once opened, consume within 30 days. Do not freeze. For better taste, use Vegan's Corner's special Mayonnaise and sauce.",
            life: "30 days",
        },
        images:["https://i.postimg.cc/zGDY4x7b/burger-1.jpg","https://i.postimg.cc/ZKxhfG8z/burger-2.jpg","https://i.postimg.cc/W19cV0Y9/burger-3.jpg"],
        ratings: 100,
        reviews: 50,
        rrlink: "https://vegancorner.vercel.app",
        related:[""],
        priority:1,
        offer:false,
        others1:"",
        others2:[],
    },
    {
        id: "00000011",
        type: "quick foods",
        name: "Instant Noodles",
        seller: "Vegan's Corner",
        stars: 4.6,
        tag: ["instantfoods","noodles"],
        details: {
            stock : 20,
            price: 99,
            price2: 129,
            weight: "200g",
            packaging: "Plastic Packet",
            ingredients: "Gram Flour, Vegetable Oil, Peanuts, Lentils, Sago, Rice Flakes, Salt, Sugar, Spices, Turmeric, Citric Acid",
            description: "Instant Noodles is a pure vegan and extremely delicious noodles.Specially for kids, It's perfect for parties, and picnics. It's also free from dairy, eggs, lactose, cholesterol, peanuts, and gluten. It's a great tasting, versatile, and non-dairy alternative for your favourite recipes. Enjoy Diet Mix... for a healthy lifestyle",
            instructions: "Store in a cool, dry place. Once opened, consume within 30 days. Do not freeze. Simply drop noodles in hot water, add masala, cook for 5 minutes and enjoy.",
            life: "30 days",
        },
        images:["https://i.postimg.cc/T33Btp2n/noodles-12.jpg","https://i.postimg.cc/DztDf6rc/noodles-13.jpg","https://i.postimg.cc/3J7sDtPS/noodles-2.jpg"],
        ratings: 100,
        reviews: 15,
        rrlink: "https://vegancorner.vercel.app",
        related:["00000012","00000013"],
        priority:0,
        offer:false,
        others1:"",
        others2:[],

    },
    {
        id: "00000012",
        type: "quick foods",
        name: "Instant Noodles",
        seller: "Vegan's Corner",
        stars: 4.3,
        tag: ["instantfoods","noodles"],
        details: {
            stock : 20,
            price: 179,
            price2: 189,
            weight: "200g",
            packaging: "Plastic Packet",
            ingredients: "Gram Flour, Vegetable Oil, Peanuts, Lentils, Sago, Rice Flakes, Salt, Sugar, Spices, Turmeric, Citric Acid",
            description: "Instant Noodles is a pure vegan and extremely delicious noodles.Specially for kids, It's perfect for parties, and picnics. It's also free from dairy, eggs, lactose, cholesterol, peanuts, and gluten. It's a great tasting, versatile, and non-dairy alternative for your favourite recipes. Enjoy Diet Mix... for a healthy lifestyle",
            instructions: "Store in a cool, dry place. Once opened, consume within 30 days. Do not freeze. Simply drop noodles in hot water, add masala, cook for 5 minutes and enjoy.",
            life: "30 days",
        },
        images:["https://i.postimg.cc/DfqVZ9Y4/noodles-1.jpg","https://i.postimg.cc/xdkhShzC/noodles-11.jpg","https://i.postimg.cc/R0N5Zqjv/noodles-3.jpg","https://i.postimg.cc/j2YGccCj/noodles-4.jpg"],
        ratings: 120,
        reviews: 15,
        rrlink: "https://vegancorner.vercel.app",
        related:["00000011","00000013"],
        priority:1,
        offer:false,
        others1:"",
        others2:[],
    },
    {
        id: "00000013",
        type: "quick foods",
        name: "Instant Noodles",
        seller: "Vegan's Corner",
        stars: 4.9,
        tag: ["instantfoods","noodles"],
        details: {
            stock : 20,
            price: 199,
            price2: 289,
            weight: "200g",
            packaging: "Plastic Packet",
            ingredients: "Gram Flour, Vegetable Oil, Peanuts, Lentils, Sago, Rice Flakes, Salt, Sugar, Spices, Turmeric, Citric Acid",
            description: "Instant Noodles is a pure vegan and extremely delicious noodles.Specially for kids, It's perfect for parties, and picnics. It's also free from dairy, eggs, lactose, cholesterol, peanuts, and gluten. It's a great tasting, versatile, and non-dairy alternative for your favourite recipes. Enjoy Diet Mix... for a healthy lifestyle",
            instructions: "Store in a cool, dry place. Once opened, consume within 30 days. Do not freeze. Simply drop noodles in hot water, add masala, cook for 5 minutes and enjoy.",
            life: "30 days",
        },
        images:["https://i.postimg.cc/3J7sDtPS/noodles-2.jpg","https://i.postimg.cc/DztDf6rc/noodles-13.jpg","https://i.postimg.cc/T33Btp2n/noodles-12.jpg"],
        ratings: 90,
        reviews: 12,
        rrlink: "https://vegancorner.vercel.app",
        related:["00000012","00000011"],
        priority:2,
        offer:false,
        others1:"",
        others2:[],
    },
    {
        id: "00000014",
        type: "milk",
        name: "Mayonnaise Pack",
        seller: "Vegan's Corner",
        stars: 4.8,
        tag: ["milk","premium","mayonnaise","mayo"],
        details: {
            stock : 20,
            price: 299,
            price2: 389,
            weight: "200g",
            packaging: "Container, Recyclable",
            ingredients: "Soy Milk, Vinegar, Salt, Sugar, Spices, Turmeric, Citric Acid",
            description: "Mayonnaise is a pure vegan and extremely delicious mayonnaise. It's perfect for sandwiches, burgers, and salads. It's also free from dairy, eggs, lactose, cholesterol, peanuts, and gluten. It's a great tasting, versatile, and non-dairy alternative for your favourite recipes. Enjoy Vegan Products for a healthy lifestyle",
            instructions: "Store in a cool, dry place. Once opened, consume within 60 days. Do not freeze.",
            life: "30 days",
        },
        images:["https://i.postimg.cc/Bvx5DCWp/mayo-1.jpg","https://i.postimg.cc/m2DSqMMZ/mayo-5.jpg","https://i.postimg.cc/k5rFBpHD/mayo-7.jpg","https://i.postimg.cc/NMD1Cfjr/mayo-8.jpg"],
        ratings: 100,
        reviews: 15,
        rrlink: "https://vegancorner.vercel.app",
        related:["00000015"],
        priority:2,
        offer:false,
        others1:"",
        others2:[],
    },
    {
        id: "00000015",
        type: "milk",
        name: "Mayonnaise Premium",
        seller: "Vegan's Corner",
        stars: 4.8,
        tag: ["milk","premium","mayonnaise","mayo"],
        details: {
            stock : 20,
            price: 299,
            price2: 389,
            weight: "200g",
            packaging: "Plastic Packet, Air tight",
            ingredients: "Soy Milk, Vinegar, Salt, Sugar, Spices, Citric Acid",
            description: "Mayonnaise is a pure vegan and extremely delicious mayonnaise. It's perfect for sandwiches, burgers, and salads. It's also free from dairy, eggs, lactose, cholesterol, peanuts, and gluten. It's a great tasting, versatile, and non-dairy alternative for your favourite recipes. Enjoy Vegan Products for a healthy lifestyle",
            instructions: "Store in a cool, dry place. Once opened, consume within 60 days. Do not freeze. ",
            life: "30 days",
        },
        images:["https://i.postimg.cc/KjYt6S1p/mayo-2.jpg","https://i.postimg.cc/vHNvdBLr/mayo-3.jpg","https://i.postimg.cc/Nj2kGcpW/mayo-4.jpg","https://i.postimg.cc/63trhGtX/mayo-6.jpg"],
        ratings: 100,
        reviews: 15,
        rrlink: "https://vegancorner.vercel.app",
        related:["00000014"],
        priority:2,
        offer:false,
        others1:"",
        others2:[],
    },
    {
        id: "00000016",
        type: "milk",
        name: "Butter Multipack",
        seller: "Vegan's Corner",
        stars: 4.8,
        tag: ["milk","butter"],
        details: {
            stock : 20,
            price: 199,
            price2: 229,
            weight: "100g",
            packaging: "Plastic Packet",
            ingredients: "Soy Milk, Vinegar, Salt, Sugar, Spices, Citric Acid",
            description: "Butter is a pure vegan and extremely delicious butter. It's perfect for sandwiches, burgers. It's also free from dairy, eggs, lactose, cholesterol, peanuts, and gluten. It's a great tasting, versatile, and non-dairy alternative for your favourite recipes. Enjoy Vegan Products for a healthy lifestyle",
            instructions: "Store in a fridge, or cool, dry place. Once opened, consume within 5 days. Do not freeze. Simply drop noodles in hot water, add masala, cook for 5 minutes and enjoy.",
            life: "30 days",
        },
        images: ["https://i.postimg.cc/x8KSV7BH/butter-10.jpg","https://i.postimg.cc/rwqqMVVp/butter-2.jpg","https://i.postimg.cc/NfqgC8Zm/butter-3.jpg","https://i.postimg.cc/8PRT2JV3/butter-4.jpg","https://i.postimg.cc/JhnmHpBV/butter-6.jpg"],
        ratings: 100,
        reviews: 10,
        rrlink: "https://vegancorner.vercel.app",
        related:["00000017","00000018"],
        priority:1,
        offer:false,
        others1:"",
        others2:[],
    },
    {
        id: "00000017",
        type: "milk",
        name: "Butter from Plants",
        seller: "Vegan's Corner",
        stars: 4.4,
        tag: ["milk","butter"],
        details: {
            stock : 20,
            price: 99,
            price2: 129,
            weight: "50g",
            packaging: "Plastic Packet",
            ingredients: "Soy Milk, Vinegar, Salt, Sugar, Spices, Citric Acid",
            description: "Butter is a pure vegan and extremely delicious butter. It's perfect for sandwiches, burgers. It's also free from dairy, eggs, lactose, cholesterol, peanuts, and gluten. It's a great tasting, versatile, and non-dairy alternative for your favourite recipes. Enjoy Vegan Products for a healthy lifestyle",
            instructions: "Store in a fridge, or cool, dry place. Once opened, consume within 5 days. Do not freeze. Simply drop noodles in hot water, add masala, cook for 5 minutes and enjoy.",
            life: "30 days",
        },
        images: ["https://i.postimg.cc/MptqGCHm/butter-5.jpg","https://i.postimg.cc/LsbStjzq/butter-7.jpg","https://i.postimg.cc/Y0cwVkDM/butter-9.jpg"],
        ratings: 100,
        reviews: 10,
        rrlink: "https://vegancorner.vercel.app",
        related:["00000016","00000018"],
        priority:1,
        offer:false,
        others1:"",
        others2:[],
    },
    {
        id: "00000018",
        type: "milk",
        name: "Butter Premium",
        seller: "Vegan's Corner",
        stars: 4.6,
        tag: ["milk","butter"],
        details: {
            stock : 20,
            price: 229,
            price2: 329,
            weight: "50g",
            packaging: "Plastic Packet",
            ingredients: "Soy Milk, Vinegar, Salt, Sugar, Spices, Citric Acid",
            description: "Butter is a pure vegan and extremely delicious butter. It's perfect for sandwiches, burgers. It's also free from dairy, eggs, lactose, cholesterol, peanuts, and gluten. It's a great tasting, versatile, and non-dairy alternative for your favourite recipes. Enjoy Vegan Products for a healthy lifestyle",
            instructions: "Store in a fridge, or cool, dry place. Once opened, consume within 5 days. Do not freeze. Simply drop noodles in hot water, add masala, cook for 5 minutes and enjoy.",
            life: "30 days",
        },
        images: ["https://i.postimg.cc/Hx8gBj26/butter-8.jpg","https://i.postimg.cc/pVnWBccP/butter-11.jpg"],
        ratings: 100,
        reviews: 10,
        rrlink: "https://vegancorner.vercel.app",
        related:["00000017","00000016"],
        priority:2,
        offer:false,
        others1:"",
        others2:[],
    },
    {
        id: "00000019",
        type: "grocery",
        name:"Vegan's Meat",
        seller: "Vegan's Corner",
        stars: 4.8,
        tag: ["grocery","meat"],
        details: {
            stock : 20,
            price: 499,
            price2: 589,
            weight: "250g",
            packaging: "Plastic Packet",
            ingredients: "Vegetables, Soy extracts, Vinegar, Salt, Sugar, Spices, Citric Acid",
            description: "Veg Meat is a pure vegan and extremely delicious meat. It's perfect for dinner. Switch to Vegan's Corner Special Veg Meat .Enjoy Vegan Products for a healthy lifestyle",
            instructions: "Store in a fridge, or cool, dry place. Once opened, consume within 2 days. Do not freeze.Boil for 10 minutes, then prepare onion, spices and salt according to your taste for 10 minutes, add Vegan's Corner Veg Meat and cook for 5 minutes, your delicious vegan meat is ready to eat. Server hot!",
            life: "15 days",
        },
        images:["https://i.postimg.cc/rm78k5s6/vegmeat-3.jpg","https://i.postimg.cc/TwKRFtRq/vegmeat-4.jpg","https://i.postimg.cc/Hsgg9Y7t/vegmeat-2.jpg","https://i.postimg.cc/HxR18Mqp/vegmeat-1.jpg"],
        ratings: 8000,
        reviews: 40,
        rrlink: "https://vegancorner.vercel.app",
        related:[],
        priority:2,
        offer:false,
        others1:"",
        others2:[],
    },
    {
        id: "00000020",
        type: "munchies",
        name:"Lay's Classic Chips",
        seller: "Lay's India",
        stars: 4.8,
        tag: ["snacks","chips"],
        details: {
            stock : 20,
            price: 39,
            price2: 40,
            weight: "20g",
            packaging: "Plastic Packet",
            ingredients: "Potatoes, Salt, Sugar, Spices, Citric Acid",
            description: "Vegan's Special Chips is a pure vegan and extremely delicious chips. It's perfect for snacks. Enjoy Vegan Products for a healthy lifestyle",
            instructions: "Store in a dry place. Once opened, consume within 2 days. Do not freeze.",
            life: "120 days",
        },
        images:["https://www.urbangroc.com/wp-content/uploads/2021/05/salted-chips-01.jpg","https://m.media-amazon.com/images/I/71HofFavxML.jpg","https://m.media-amazon.com/images/I/71uN3Nd43UL._AC_UF1000,1000_QL80_.jpg"],
        ratings: 100,
        reviews: 15,
        rrlink: "https://vegancorner.vercel.app",
        related:["00000021"],
        priority:1,
        offer:false,
        others1:"",
        others2:[],
    },
    {
        id: "00000021",
        type: "munchies",
        name:"Lay's Tomato Chips",
        seller: "Lay's India",
        stars: 4.8,
        tag: ["snacks","chips"],
        details: {
            stock : 20,
            price: 39,
            price2: 40,
            weight: "20g",
            packaging: "Plastic Packet",
            ingredients: "Potatoes, Salt, Sugar, Spices, Citric Acid",
            description: "Vegan's Special Chips is a pure vegan and extremely delicious chips. It's perfect for snacks. Enjoy Vegan Products for a healthy lifestyle",
            instructions: "Store in a dry place. Once opened, consume within 2 days. Do not freeze.",
            life: "120 days",
        },
        images:["https://m.media-amazon.com/images/I/71YgoSM0ioL._AC_UF1000,1000_QL80_.jpg","https://m.media-amazon.com/images/I/71FMaRg8H2L._AC_UF1000,1000_QL80_.jpg","https://m.media-amazon.com/images/I/61gmZr2S-WL.jpg"],
        ratings: 80,
        reviews: 15,
        rrlink: "https://vegancorner.vercel.app",
        related:["00000020"],
        priority:1,
        offer:false,
        others1:"",
        others2:[],
    }
    


]

export default catalogue;



