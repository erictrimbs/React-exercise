import Link from 'next/link';

const Header = () => {
  return (
    <header>
      <nav>
        <ul>
          <li><Link href="/">Home</Link></li>
          <li><Link href="/component1">Component1</Link></li>
          <li><Link href="/component2">Component2</Link></li>
          <li><Link href="/component3">Component3</Link></li>
          <li><Link href="/component4">Component4</Link></li>
          <li><Link href="/component5">Component5</Link></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
