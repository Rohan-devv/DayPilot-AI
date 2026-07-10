import { sendEmail } from "@/lib/services/gmail/messages/service";
import { getMessage } from "@/lib/services/gmail/messages/service"; 



async function main() {
  const response = await getMessage("user_2", {
    messageId: "19f3d4e778c03138",
  });

  console.log(response.payload?.headers);
}


main();