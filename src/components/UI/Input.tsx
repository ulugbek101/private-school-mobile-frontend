import { InputMask } from "@react-input/mask";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
	icon?: string;
	iconClass?: string;
	onIconClick?: () => void;
	mask?: string;
	replacement?: Record<string, RegExp>;
}

function Input({
	className = "",
	icon,
	iconClass = "",
	onIconClick = () => {},
	mask,
	replacement,
	...rest
}: Props) {
	const inputClassName = `${className} font-semibold text-xs w-full focus:outline-none rounded`;

	return (
		<div className="relative">
			{mask ? (
				<InputMask
					mask={mask}
					replacement={replacement}
					className={inputClassName}
					{...rest}
				/>
			) : (
				<input className={inputClassName} {...rest} />
			)}

			{icon && (
				<span
					onClick={onIconClick}
					className={`material-icons ${iconClass} select-none absolute right-3 top-1/2 -translate-y-1/2 active:scale-95 active:opacity-50 hover:cursor-pointer transition`}
				>
					{icon}
				</span>
			)}
		</div>
	);
}

export default Input;
