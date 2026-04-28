// services/shippingService.js

exports.calculate = async ({ weight, mode }) => {
    let ratePerKg;
  
    switch (mode) {
      case "air":
        ratePerKg = 8;
        break;
      case "sea":
        ratePerKg = 2;
        break;
      case "road":
        ratePerKg = 3;
        break;
      default:
        ratePerKg = 5;
    }
  
    return weight * ratePerKg;
  };
