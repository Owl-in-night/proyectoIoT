import { useLanguage } from "../context/LanguageContext";

function CopyR() {
  const { language, translations } = useLanguage();
  const texts = translations[language].footer;
  return (
    <>
      <div>
        <header className="flex justify-between items-center p-4">
          <div className="flex items-center space-x-4">
            <h1 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              Copyright Notice for Electronic Lock
            </h1>
          </div>
        </header>
        <div className="flex flex-col items-center p-5">
          <div className="w-full flex justify-around mt-10">
            <div className="text-center">
              <p className="font-semibold text-xl text-gray-700 dark:text-gray-300 mb-2">
                The content of the web application Electronic Lock is protected
                by copyright. Electronic Lock is an innovative digital solution
                developed by students of Imaginary University. This notice
                establishes the terms under which you may use and access the
                content and services offered by Electronic Lock. Copyright: All
                copyright and other intellectual property rights in relation to
                Electronic Lock are owned by the developers and creators of the
                application, students of Imaginary University. Trademarks: The
                name "Electronic Lock" and its associated logo are trademarks
                owned by the developers of the application. Use of Content:
                Viewing, downloading, and copying content from Electronic Lock
                is permitted for personal, non-commercial use only. Any
                modification, redistribution, or reproduction of the content
                without explicit permission from the copyright owners is
                prohibited. Disclaimer of Liability: The developers of
                Electronic Lock are not liable for any inappropriate or illegal
                use of the content or services offered on this platform. Privacy
                Policy: For more information on how your personal information is
                collected, used, and protected on Electronic Lock, please refer
                to our Privacy Policy. Contact: If you have questions regarding
                this copyright notice or wish to request additional usage
                permissions, please contact us at www.uvg.edu.gt.
                Last Updated: This copyright notice was last updated on June 17,
                2024.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CopyR;
