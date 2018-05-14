jQuery.extend = jQuery.fn.extend = function() {
  var options, name, src, copy, copyIsArray, clone,
    //确定extend方法的target对象
    target = arguments[ 0 ] || {},
    i = 1,
    length = arguments.length,
    //是否是深拷贝
    deep = false;

  // Handle a deep copy situation
  if ( typeof target === "boolean" ) {
    deep = target;
    //如果第一个参数是boolean，则target取第二个参数，deep取第一个参数
    // Skip the boolean and the target
    target = arguments[ i ] || {};
    i++;
  }

  //处理target不是对象，或者不是函数的特殊情况
  // Handle case when target is a string or something (possible in deep copy)
  if ( typeof target !== "object" && !jQuery.isFunction( target ) ) {
    target = {};
  }

  //如果当前i==length，则target则为jQuery，也就是扩展Jquery对象
  // Extend jQuery itself if only one argument is passed
  if ( i === length ) {
    target = this;
    i--;
  }

  for ( ; i < length; i++ ) {

    //遍历arguments，并进行copy
    // Only deal with non-null/undefined values
    if ( ( options = arguments[ i ] ) != null ) {

      // Extend the base object
      for ( name in options ) {
        src = target[ name ];
        copy = options[ name ];

        // Prevent never-ending loop
        if ( target === copy ) {
          continue;
        }

        // Recurse if we're merging plain objects or arrays
        if ( deep && copy && ( jQuery.isPlainObject( copy ) ||
          ( copyIsArray = Array.isArray( copy ) ) ) ) {

          if ( copyIsArray ) {
            //被拷贝对象是数组
            copyIsArray = false;
            clone = src && Array.isArray( src ) ? src : [];

          } else {
            //被拷贝对象是对象
            clone = src && jQuery.isPlainObject( src ) ? src : {};
          }

          //递归拷贝子属性
          // Never move original objects, clone them
          target[ name ] = jQuery.extend( deep, clone, copy );

        // Don't bring in undefined values
        } else if ( copy !== undefined ) {
          target[ name ] = copy;
        }
      }
    }
  }

  // Return the modified object
  return target;
};