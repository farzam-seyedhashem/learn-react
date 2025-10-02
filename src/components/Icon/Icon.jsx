import React from 'react';
import clsx from 'clsx'; // مطمئن شوید که clsx را نصب کرده‌اید: npm install clsx
import PropTypes from 'prop-types'; // PropTypes را ایمپورت کنید: npm install prop-types

/**
 * Renders an icon component with customizable styles based on Material Symbols.
 *
 * @param {Object} props - The properties for the Icon component.
 * @param {boolean} [props.fill=false] - Determines if the icon should be filled. If `true`, applies a filled style. Default is `false`.
 * @param {number} [props.wght=400] - Specifies the weight of the icon. Acceptable values are 100, 200, 300, 400, 500, 600, 700. Default is 400.
 * @param {number} [props.grad=0] - Specifies the grade of the icon. Acceptable values are -25, 0, 200. Default is 0.
 * @param {number} [props.size=24] - Specifies the optical size of the icon. Values less than 24, between 24 and 40, between 40 and 48, and 48 or greater correspond to specific styles.
 * @param {ReactNode} [props.children] - Optional child components or text to be rendered inside the icon.
 * @param {string} [props.className] - Sets the CSS class for the icon, allowing for custom styling or class overrides.
 * @param {Object} [props.props] - Additional attributes passed to the component.
 *
 * @returns {JSX.Element} The rendered icon component with the applied styles and properties.
 */
const Icon = ({
	              fill = false,
	              wght = 400,
	              grad = 0,
	              // opsz = 24,
	              size= 24,
	              children,
	              className, // دریافت className از props برای قابلیت override
	              ...props
              }) => {
	const baseClasses = 'material-symbols-outlined material-symbols';

	const fillStyles = {
		"fill-1": fill,
		"fill-0": !fill,
	};
	const weightStyles = {
		'wght-100': wght === 100,
		'wght-200': wght === 200,
		'wght-300': wght === 300,
		'wght-400': wght === 400,
		'wght-500': wght === 500,
		'wght-600': wght === 600,
		'wght-700': wght === 700,
	};
	const gradeStyles = {
		'-grad-25': grad === -25,
		'grad-0': grad === 0,
		'grad-200': grad === 200,
	};
	const opticalSizeStyles = {
		'opsz-20': size<24,
		'opsz-24': (40>size>=24),
		'opsz-40': (48>size>=40),
		'opsz-48': (size>=48),
	};


	// const disabledClasses = {
	// 	'': isDisabled,
	// };

	return (
		<span style={{fontSize:size}}
		        className={`${clsx(
			        baseClasses,
			        fillStyles,
			        weightStyles,
			        gradeStyles,
			        opticalSizeStyles,
			        className, // اضافه کردن className دریافتی از props در انتها
		        )}`}
		        {...props}
		>
			{children}
		</span>
	);
};

// --- PropTypes برای اعتبارسنجی پراپ‌ها ---
Icon.propTypes = {
	/**
	 * Icon Grade
	 * Change emphasise of icon
	 */
	grad: PropTypes.oneOf([-25, 0, 200]),
	/**
	 * Icon Weight
	 */
	wght: PropTypes.oneOf([100, 200, 300, 400, 500, 600, 700]),
	/**
	 * Icon Optical Size
	 */
	// opsz: PropTypes.oneOf([20, 24, 40, 48]),
	/**
	 * Icon Size
	 */
	size: PropTypes.number,
	/**
	 * Icon Fill
	 */
	fill: PropTypes.bool,
	/**
	 * Icon Symbol Name
	 */
	children: PropTypes.node.isRequired,
	/**
	 * Icon Custom Class
	 */
	className: PropTypes.string,
};

export default Icon;