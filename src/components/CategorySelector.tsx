import type { Category } from "../data/quotes";
import { CategoryIcon } from "./Icons";
import "./CategorySelector.css";

interface Props {
  categories: Category[];
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export default function CategorySelector({ categories, onSelect }: Props) {
  return (
    <div className="category-list">
      {categories.map((cat) => (
        <button
          key={cat.id}
          className="category-card"
          onClick={() => onSelect(cat.id)}
        >
          <span className="card-emoji"><CategoryIcon id={cat.id} size={28} /></span>
          <div className="card-text">
            <span className="card-name">{cat.name}</span>
            <span className="card-desc">{cat.description}</span>
          </div>
          <span className="card-count">{cat.quotes.length}개</span>
          <span className="card-arrow">›</span>
        </button>
      ))}
    </div>
  );
}
