// ONLY RUN THIS FILE ONCE TO SEED.

import { createClient } from "@supabase/supabase-js";
import { faker } from "@faker-js/faker";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

const seedCategories = async () => {
  const categorySet = new Set();
  while (categorySet.size < 100) {
    categorySet.add(faker.commerce.department());
  }

  const categories = Array.from(categorySet).map((name) => ({ name }));
  const { error } = await supabase.from("categories").insert(categories);

  if (error) {
    console.error("Error", error.message);
  } else {
    console.log("Success");
  }
};

seedCategories();
