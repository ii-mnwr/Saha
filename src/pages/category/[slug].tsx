import { GetStaticPaths, GetStaticProps } from 'next';
import React from 'react';
import CategoryCompo from 'src/components/category/CategoryCompo';
import Layout from 'src/layouts/layout';

interface CategoryProps {
  name?: string; // Define the type according to your data structure
}

const Category: React.FC<CategoryProps> = ({ name }: any) => <CategoryCompo category={name} />;

Category.getLayout = (page: React.ReactElement) => <Layout>{page}</Layout>;

export const getStaticPaths: GetStaticPaths = async () => ({
  paths: [],
  fallback: true,
});
export const getStaticProps: GetStaticProps = async (context) => {
  const { params } = context;

  return { props: { name: params?.slug } };
};

export default Category;
