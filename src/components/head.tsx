type HeadParams = {
  title: string;
};

export default function Head({ title }: HeadParams) {
  return (
    <>
      <title>{`Acessiweb - ${title}`}</title>
    </>
  );
}
